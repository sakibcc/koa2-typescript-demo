import * as Koa from 'koa'
import * as views from 'koa-views'
import * as json from 'koa-json'
import * as bodyparser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import * as koaStatic from 'koa-static'
import index from './routes/index'
import users from './routes/users'

const app = new Koa()
const onerror = require('koa-onerror')

// const index = require('./routes/index')
// const users = require('./routes/users')

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
    extension: 'pug'
  })
)

// logger
app.use(async (ctx: any, next: any) => {
  const start = new Date()
  await next()
  const ms = +new Date() - +start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes())
app.use(index.allowedMethods())
app.use(users.routes())
app.use(users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

// module.exports = app
export default app
