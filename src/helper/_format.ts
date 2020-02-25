/**
 * @description 数据格式化
 */

import { DEFAULT_PICTURE } from '../conf/constant'
import { UserInfo } from '../types/index'

function _formatUserPicture(obj: UserInfo): UserInfo {
  if (obj.picture === null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

export function formatUser(val: UserInfo): UserInfo
export function formatUser(val: UserInfo[]): UserInfo[]
export function formatUser(val: UserInfo | UserInfo[]): UserInfo | UserInfo[] {
  if (Array.isArray(val)) {
    const data = val.map(_formatUserPicture)
    return data
  }
  const data = _formatUserPicture(val)
  return data
}
