/**
 * @description 错误路由
 */

import * as KoaRouter from 'koa-router'

const router = new KoaRouter()

// error
router.get('/error', async (ctx, next) => {
  await ctx.render('error')
})

// 404
router.get('*', async (ctx, next) => {
  await ctx.render('404')
})

export default router
