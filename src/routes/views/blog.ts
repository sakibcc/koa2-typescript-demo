/**
 * @description 微博 view 路由
 */

import * as KoaRouter from 'koa-router'
import { ParameterizedContext } from 'koa'
import { loginRedirect } from '../../middlewares/loginCheck'
import BlogProfileController from '../../controller/blogProfile'
import UserController from '../../controller/user'
import { SuccessModel } from '../../model/ResModel'

const router = new KoaRouter()

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  let curUserInfo = null
  const userInfo = ctx.session.userInfo
  const userName = userInfo.userName
  const { userName: curUserName } = ctx.params
  const isMe = userName === curUserName
  if (isMe) {
    curUserInfo = userInfo
  } else {
    const existUser = await UserController.isExist(curUserName)
    if (existUser instanceof SuccessModel) {
      curUserInfo = existUser.data
    }
  }
  const result = await BlogProfileController.getProfileBlogList(curUserName)
  if (result instanceof SuccessModel) {
    await ctx.render('profile', {
      blogData: result.data,
      userData: {
        userInfo: curUserInfo,
        isMe
      }
    })
  } else {
    await ctx.render('profile', {
      blogData: {
        isEmpty: true,
        blogList: []
      },
      userData: {
        userInfo: curUserInfo,
        isMe
      }
    })
  }
})
export default router
