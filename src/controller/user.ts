/**
 * @description user controller
 */

import UserService from '../services/user'
import { BaseModel, SuccessModel, ErrorModel } from '../model/ResModel'

class UserController {
  /**
   * @description
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
}

export default new UserController()
