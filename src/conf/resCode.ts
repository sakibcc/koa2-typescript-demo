/**
 * @description 业务状态码集合
 */

const baseCode = {
  '10001': '系统异常',
  '10002': '登录失败',
  '10003': '用户名不存在',
  '10004': '数据校验失败',
  '10005': '用户未登录'
}

const allCodeList: {
  [_: string]: string
} = Object.assign({}, baseCode)
export function getResCodeAndMessage(code: string): string {
  return allCodeList[code] || '系统错误'
}
