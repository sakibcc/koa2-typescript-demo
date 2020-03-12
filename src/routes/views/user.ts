/**
 * @description 用户路由
 */

import * as KoaRouter from 'koa-router'
import { User } from '../../db/seq'
import { ParameterizedContext } from 'koa'
import { loginRedirect } from '../../middlewares/loginCheck'

const router = new KoaRouter()

/**
 * @description 获取登录信息
 * @date 2020-02-27
 * @param {ParameterizedContext} ctx
 * @returns {{
 *   isLogin: boolean
 *   userInfo: UserTable
 * }}
 */
function getLoginInfo(
  ctx: ParameterizedContext
): {
  isLogin: boolean
  userInfo: User
} {
  let data = {
    isLogin: false,
    userInfo: null as User
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

router.get('/setting', loginRedirect, async (ctx, next) => {
  await ctx.render('setting', ctx.session.userInfo)
})

export default router
