/**
 * @description user controller
 */

import { getUserInfo } from '../services/user'
import { BaseModel, SuccessModel, ErrorModel } from '../model/ResModel'
import { UserInfo } from '../types'
/**
 * @description
 * @date 2020-02-23
 * @export
 * @param {string} userName
 * @returns {boolean}
 */
export async function isExist(userName: string): Promise<BaseModel> {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new SuccessModel<UserInfo>(userInfo)
  } else {
    return new ErrorModel({
      code: '10003',
      message: '用户不存在'
    })
  }
}
