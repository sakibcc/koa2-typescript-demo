/**
 * @description json schema 中间件
 */

import { ErrorModel } from '../model/ResModel'
type validateFunction = {
  (data: object): boolean
}
/**
 * @description 校验中间件
 * @date 2020-02-27
 * @export
 * @param {*} validateFn 校验函数
 * @returns
 */
export function genValidator(validateFn: validateFunction) {
  async function valietor(ctx: any, next: any) {
    const data = ctx.request.body
    const valid = validateFn(data)
    if (!valid) {
      // 校验失败
      ctx.body = new ErrorModel('10004')
      return
    }
    await next()
  }

  return valietor
}
