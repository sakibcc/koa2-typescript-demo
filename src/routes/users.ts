import * as KoaRouter from 'koa-router'
const router = new KoaRouter()

router.prefix('/users')

router.get('/', function(ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function(ctx, next) {
  ctx.body = 'this is a users/bar response'
})

// module.exports = router
export default router
