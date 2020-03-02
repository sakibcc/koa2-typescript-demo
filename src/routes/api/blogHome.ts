/**
 * @description 博客首页路由
 */

import * as KoaRouter from 'koa-router'
import { loginCheck } from '../../middlewares/loginCheck'
import BlogHomeController from '../../controller/blogHome'
import { genValidator } from '../../middlewares/validator'
import { blogValidate } from '../../utils/validator/blog'
const router = new KoaRouter()

router.prefix('/api/blog')

router.post(
  '/create',
  loginCheck,
  genValidator(blogValidate),
  async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await BlogHomeController.create({ userId, content, image })
  }
)

export default router
