/**
 * @description 数据格式化
 */

import { DEFAULT_PICTURE } from '../conf/constant'
import UserTable from '../db/model/user.model'

function _formatUserPicture(obj: UserTable): UserTable {
  if (!obj.picture) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

export function formatUser(val: UserTable): UserTable
export function formatUser(val: UserTable[]): UserTable[]
export function formatUser(
  val: UserTable | UserTable[]
): UserTable | UserTable[] {
  if (Array.isArray(val)) {
    const data = val.map(_formatUserPicture)
    return data
  }
  const data = _formatUserPicture(val)
  return data
}
