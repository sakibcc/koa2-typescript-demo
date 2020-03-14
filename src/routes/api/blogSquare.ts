/**
 * @description 个人主页 API 路由
 */

import * as KoaRouter from 'koa-router'
import { loginCheck } from '../../middlewares/loginCheck'
import BlogSquareController from '../../controller/blogSquare'
import { getBlogListStr } from '../../utils/blogTool'
import { SuccessModel } from '../../model/ResModel'
const router = new KoaRouter()
router.prefix('/api/square')

router.get('/loadMore/:pageNo', loginCheck, async (ctx, next) => {
  let { pageNo } = ctx.params
  pageNo = parseInt(pageNo, 10)
  const result = await BlogSquareController.getSquareBlogList(pageNo)
  if (result instanceof SuccessModel) {
    const blogListTpl = getBlogListStr(result.data.blogList)
    ;(result.data as any).blogListTpl = blogListTpl
    ctx.body = result
  }
})

export default router
