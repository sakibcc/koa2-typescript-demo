/**
 * @description 个人主页 API 路由
 */

import * as KoaRouter from 'koa-router'
import { loginCheck } from '../../middlewares/loginCheck'
import BlogProfileController from '../../controller/blogProfile'
import { getBlogListStr } from '../../utils/blogTool'
import { SuccessModel } from '../../model/ResModel'
const router = new KoaRouter()
router.prefix('/api/profile')

router.get('/loadMore/:userName/:pageNo', loginCheck, async (ctx, next) => {
  let { userName, pageNo } = ctx.params
  pageNo = parseInt(pageNo, 10)
  const result = await BlogProfileController.getProfileBlogList(
    userName,
    pageNo
  )
  if (result instanceof SuccessModel) {
    const blogListTpl = getBlogListStr(result.data.blogList)
    ;(result.data as any).blogListTpl = blogListTpl
    ctx.body = result
  }
})

router.post('/follow', async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await BlogProfileController.handleFollow(userId, curUserId)
})
router.post('/unfollow', async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await BlogProfileController.removeFollow(userId, curUserId)
})

export default router
