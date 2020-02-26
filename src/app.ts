import * as Koa from 'koa'
import * as views from 'koa-views'
import * as json from 'koa-json'
import * as bodyparser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import * as koaStatic from 'koa-static'
import { REDIS_CONF } from './conf/db'
import { APP_KEY } from './conf/constant'

import * as session from 'koa-session'
import * as redisStore from 'koa-redis'

const app = new Koa()
const onerror = require('koa-onerror')
// router
import index from './routes/index'
import userViewRouter from './routes/views/user'
import userApiRouter from './routes/api/user'

// error handler
onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
)

// logger
app.use(async (ctx: any, next: any) => {
  const start = new Date()
  await next()
  const ms = +new Date() - +start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session
app.keys = [APP_KEY]

app.use(
  session(
    {
      key: 'demo.sid', // cookie name
      prefix: 'demo:sess:', // redis key 的前缀
      store: redisStore({
        host: REDIS_CONF.host,
        port: REDIS_CONF.port,
        db: 1
      }),
      signed: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/'
    },
    app
  )
)

// routes
app.use(index.routes()).use(index.allowedMethods())
app.use(userViewRouter.routes()).use(userViewRouter.allowedMethods())
app.use(userApiRouter.routes()).use(userApiRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

// module.exports = app
export default app
