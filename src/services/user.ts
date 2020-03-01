/**
 * @description user Services处理
 */

import { User } from '../db/seq'
import { UserInfo } from '../types'
import { formatUser } from '../helper/_format'

class UserService {
  /**
   * @description 获取用户信息
   * @date 2020-02-25
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

  /**
   * @description 创建一条用户数据
   * @date 2020-02-26
   * @param {{
   *     userName: string
   *     password: string
   *     gender: number
   *     nickName: string
   *   }} payload
   * @returns {Promise<UserInfo>}
   * @memberof UserService
   */
  async createUser(payload: {
    userName: string
    password: string
    gender?: number
    nickName?: string
  }): Promise<UserInfo> {
    const { userName, password, gender, nickName } = payload
    const result = await User.create({
      userName,
      password,
      gender,
      nickName: nickName ? nickName : userName
    })
    const dataValues = result.get({ plain: true })
    return dataValues as UserInfo
  }

  /**
   * @description 删除用户
   * @date 2020-03-01
   * @param {string} userName
   * @returns {Promise<boolean>}
   * @memberof UserService
   */
  async deleteUser(userName: string): Promise<boolean> {
    const result = await User.destroy({
      where: {
        userName
      }
    })
    return result > 0
  }
}

export default new UserService()
