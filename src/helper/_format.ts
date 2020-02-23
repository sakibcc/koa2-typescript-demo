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

export function formatUser(obj: UserInfo): UserInfo {
  let data = _formatUserPicture(obj)
  return data
}
