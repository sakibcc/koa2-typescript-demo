/**
 * @description user controller
 */

import UserService from '../services/user'
import { BaseModel, SuccessModel, ErrorModel } from '../model/ResModel'
import { doCrypto } from '../utils/cryp'
class UserController {
  /**
   * @description 判断用户是否存在
   * @date 2020-02-23
   * @export
   * @param {string} userName
   * @returns {boolean}
   */
  async isExist(userName: string): Promise<BaseModel> {
    const userInfo = await UserService.getUserInfo(userName)
    if (userInfo) {
      return new SuccessModel<boolean>(true)
    } else {
      return new ErrorModel('10003')
    }
  }

  /**
   * @description 注册用户
   * @date 2020-02-26
   * @param {{
   *     userName: string
   *     password: string
   *     gender: number
   *   }} payload
   * @returns {object}
   * @memberof UserController
   */
  async register(payload: {
    userName: string
    password: string
    gender: number
  }): Promise<BaseModel> {
    const { userName } = payload
    const userInfo = await UserService.getUserInfo(userName)
    if (userInfo) {
      return new ErrorModel('10003')
    }
    payload.password = doCrypto(payload.password || '')
    try {
      await UserService.createUser(payload)
      return new SuccessModel<object>({})
    } catch (error) {
      console.error(error.message, error.stack)
      return new ErrorModel('10001')
    }
  }
}

export default new UserController()
