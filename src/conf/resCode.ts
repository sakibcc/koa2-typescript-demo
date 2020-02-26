/**
 * @description 业务状态码集合
 */

const baseCode = {
  '10001': '系统异常',
  '10003': '用户名不存在'
}

const allCodeList: {
  [_: string]: string
} = Object.assign({}, baseCode)
export function getResCodeAndMessage(code: string): string {
  return allCodeList[code] || '系统错误'
}
