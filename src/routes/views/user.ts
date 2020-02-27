/**
 * @description 用户路由
 */

import * as KoaRouter from 'koa-router'
import { UserInfo } from '../../types'
import { ParameterizedContext } from 'koa'

const router = new KoaRouter()

function getLoginInfo(
  ctx: ParameterizedContext
): {
  isLogin: boolean
  userInfo: UserInfo
} {
  let data = {
    isLogin: false,
    userInfo: null as UserInfo
  }

  if (ctx.session.userInfo) {
    data.isLogin = true
    data.userInfo = ctx.session.userInfo
  }

  return data
}

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})

export default router
