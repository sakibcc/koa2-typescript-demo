/**
 * @description user Services处理
 */

import { User } from '../db/seq'
import { UserInfo } from '../types'
import { formatUser } from '../helper/_format'

export async function getUserInfo(
  userName: string,
  password?: string
): Promise<UserInfo> {
  let whereParams = {
    userName
  }
  if (password) {
    whereParams = Object.assign({}, whereParams, { password })
  }

  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereParams
  })

  if (result === null) {
    return null
  }

  const formatRes = formatUser(result)

  return formatRes
}
