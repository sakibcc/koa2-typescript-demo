/**
 * @description user Services处理
 */

import { User } from '../db/seq'
import { UserInfo } from '../types'
import { formatUser } from '../helper/_format'

class UserService {
  /**
   * @description
   * @date 2020-02-25
   * @export
   * @param {string} userName 用户名
   * @param {string} [password] 密码
   * @returns {Promise<UserInfo>} 用户信息
   */
  async getUserInfo(userName: string, password?: string): Promise<UserInfo> {
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
}

export default new UserService()
