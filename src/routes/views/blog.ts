/**
 * @description 微博 view 路由
 */

import * as KoaRouter from 'koa-router'
import { ParameterizedContext } from 'koa'
import { loginRedirect } from '../../middlewares/loginCheck'
import BlogProfileController from '../../controller/blogProfile'
import BlogSquareController from '../../controller/blogSquare'
import UserRelationController from '../../controller/UserRelation'
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
  // 获取粉丝列表
  const fansResult = await UserRelationController.getFans(curUserInfo.id)
  let fansCount: number = 0
  let fansList: any[] = []
  if (fansResult instanceof SuccessModel) {
    fansCount = fansResult.data.count
    fansList = fansResult.data.fansList
  }

  // 是否关注此人
  const amIFollowed = fansList.some(item => item.userName === userName)

  // 获取关注人
  const followerResult = await UserRelationController.getFollowers(
    curUserInfo.id
  )
  let followerList: any[] = []
  let followerCount: number = 0
  if (followerResult instanceof SuccessModel) {
    followerList = followerResult.data.followerList
    followerCount = followerResult.data.count
  }

  // 获取微博
  const blogResult = await BlogProfileController.getProfileBlogList(curUserName)
  let blogData: Object = {}
  if (blogResult instanceof SuccessModel) {
    blogData = blogResult.data
  }
  await ctx.render('profile', {
    blogData: blogData,
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followerCount,
        list: followerList
      },
      amIFollowed
    }
  })
})

router.get('/square', loginRedirect, async (ctx, next) => {
  // 获取所有微博的第一页
  const result = await BlogSquareController.getSquareBlogList(0)

  if (result instanceof SuccessModel) {
    const { isEmpty, blogList, pageNo, pageSize, count } = result.data
    await ctx.render('square', {
      blogData: {
        isEmpty,
        blogList,
        pageSize,
        pageNo,
        count
      }
    })
  } else {
    await ctx.render('square', {
      blogData: {}
    })
  }
})
export default router
