/**
 * @description user Services处理
 */

import { User } from '../db/seq'
import { UpdateUserInfo } from '../types'
import { formatUser } from '../helper/_format'

class UserService {
  /**
   * @description 获取用户信息
   * @date 2020-02-25
   * @param {string} userName 用户名
   * @param {string} [password] 密码
   * @returns {Promise<User>} 用户信息
   */
  async getUserInfo(userName: string, password?: string) {
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
    const dataValues = result.get({ plain: true })
    const formatRes = formatUser(dataValues as User)
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
   * @returns {Promise<User>}
   * @memberof UserService
   */
  async createUser(payload: {
    userName: string
    password: string
    gender?: number
    nickName?: string
  }) {
    const { userName, password, gender, nickName } = payload
    const result = await User.create({
      userName,
      password,
      gender,
      nickName: nickName ? nickName : userName
    })
    const dataValues = result.get({ plain: true })
    return dataValues as User
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

  /**
   * @description 更新用户数据
   * @date 2020-03-01
   * @param {UpdateUserInfo} modifyData
   * @param {{
   *       userName: string
   *       password?: string
   *     }} whereParams
   * @returns
   * @memberof UserService
   */
  async updateUser(
    modifyData: UpdateUserInfo,
    whereParams: {
      userName: string
      password?: string
    }
  ) {
    const { userName, password } = whereParams
    // 拼接修改内容
    const updateData: UpdateUserInfo = {}
    Object.keys(modifyData).forEach((key: keyof UpdateUserInfo) => {
      if (modifyData[key]) {
        updateData[key] = modifyData[key]
      }
    })
    const where: any = {
      userName
    }
    if (password) {
      where.password = password
    }
    const result = await User.update(updateData, {
      where
    })
    return result[0] > 0
  }
}

export default new UserService()
