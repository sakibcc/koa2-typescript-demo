import * as Koa from 'koa'
import * as views from 'koa-views'
import * as json from 'koa-json'
import * as bodyparser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import * as koaStatic from 'koa-static'
import * as path from 'path'
import { REDIS_CONF } from './conf/db'
import { APP_KEY } from './conf/constant'

import * as session from 'koa-session'
import * as redisStore from 'koa-redis'

const app = new Koa()
const onerror = require('koa-onerror')
// router
import blogViewRouter from './routes/views/blog'
import userViewRouter from './routes/views/user'
import userApiRouter from './routes/api/user'
import utilsApiRouter from './routes/api/utils'
import blogHomeApiRouter from './routes/api/blogHome'
import blogProfileApiRouter from './routes/api/blogProfile'
import errorViewRouter from './routes/views/error'

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
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

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
        port: REDIS_CONF.port
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
app.use(blogViewRouter.routes()).use(blogViewRouter.allowedMethods())
app.use(userViewRouter.routes()).use(userViewRouter.allowedMethods())
app.use(userApiRouter.routes()).use(userApiRouter.allowedMethods())
app.use(utilsApiRouter.routes()).use(utilsApiRouter.allowedMethods())
app.use(blogHomeApiRouter.routes()).use(blogHomeApiRouter.allowedMethods())
app
  .use(blogProfileApiRouter.routes())
  .use(blogProfileApiRouter.allowedMethods())
app.use(errorViewRouter.routes).use(errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

// module.exports = app
export default app
