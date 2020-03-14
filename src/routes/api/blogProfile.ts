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

router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex, 10)
  const result = await BlogProfileController.getProfileBlogList(
    userName,
    pageIndex
  )
  if (result instanceof SuccessModel) {
    const blogListTpl = getBlogListStr(result.data.blogList)
    ;(result.data as any).blogListTpl = blogListTpl
    ctx.body = result
  }
})

export default router
