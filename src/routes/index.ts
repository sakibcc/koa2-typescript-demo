import * as KoaRouter from 'koa-router'
const router = new KoaRouter()
import { loginRedirect, loginCheck } from '../middlewares/loginCheck'

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2哈哈哈哈哈!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/session', loginCheck, async (ctx, next) => {
  const session = ctx.session
  if (session.viewNum === undefined) {
    session.viewNum = 0
  } else {
    session.viewNum++
  }

  ctx.body = {
    title: 'koa session',
    viewNum: session.viewNum
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// module.exports = router
export default router
