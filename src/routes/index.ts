import * as KoaRouter from 'koa-router'
import { BaseContext } from 'koa'
const router = new KoaRouter()

declare module 'koa' {
  interface BaseContext {
    render(str: string, config: object): any
  }
}

router.get('/', async (ctx, next: () => Promise<any>) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// module.exports = router
export default router
