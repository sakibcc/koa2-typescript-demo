/**
 * @description 微博 view 路由
 */

import * as KoaRouter from 'koa-router'
import { ParameterizedContext } from 'koa'
import { loginRedirect } from '../../middlewares/loginCheck'

const router = new KoaRouter()

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

export default router
