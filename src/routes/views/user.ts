/**
 * @description 用户路由
 */

import * as KoaRouter from 'koa-router'

const router = new KoaRouter()

router.get('/login', async (ctx, next) => {
  await ctx.render('login', {})
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', {})
})

export default router
