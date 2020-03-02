/**
 * @description 业务状态码集合
 */

const baseCode = {
  '10001': '系统异常',
  '10002': '登录失败',
  '10003': '用户名不存在',
  '10004': '数据校验失败',
  '10005': '用户未登录',
  '10006': '用户删除失败',
  '10007': '上传文件大小过大，请重新上传',
  '10008': '用户信息更新失败',
  '10009': '密码更新失败'
}

const blogCode = {
  '20001': '微博创建失败'
}

const allCodeList: {
  [_: string]: string
} = Object.assign({}, baseCode, blogCode)
export function getResCodeAndMessage(code: string): string {
  return allCodeList[code] || '系统错误'
}
