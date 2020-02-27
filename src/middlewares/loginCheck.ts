/**
 * @description 登录验证中间件
 */
import { ErrorModel } from '../model/ResModel'
import { ParameterizedContext, Next } from 'koa'

/**
 * @description 校验登录
 * @date 2020-02-27
 * @export
 * @param {ParameterizedContext} ctx
 * @param {Next} next
 * @returns
 */
export async function loginCheck(ctx: ParameterizedContext, next: Next) {
  if (ctx.session && ctx.session.userInfo) {
    await next()
    return
  }
  ctx.body = new ErrorModel('10005')
}

/**
 * @description 校验登录，并跳转路由
 * @date 2020-02-27
 * @export
 * @param {ParameterizedContext} ctx
 * @param {Next} next
 */
export async function loginRedirect(ctx: ParameterizedContext, next: Next) {
  if (ctx.session && ctx.session.userInfo) {
    await next()
    return
  }
  const url = encodeURIComponent(ctx.url)
  ctx.redirect(`/login?url=${url}`)
}
