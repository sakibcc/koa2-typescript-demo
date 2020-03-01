/**
 * @description user controller
 */

import UserService from '../services/user'
import { SuccessModel, ErrorModel } from '../model/ResModel'
import { ParameterizedContext } from 'koa'
import { doCrypto } from '../utils/cryp'
type ResultModel = SuccessModel | ErrorModel
class UserController {
  /**
   * @description 判断用户是否存在
   * @date 2020-02-23
   * @export
   * @param {string} userName
   * @returns {boolean}
   */
  async isExist(userName: string) {
    const userInfo = await UserService.getUserInfo(userName)
    if (userInfo) {
      return new SuccessModel(true)
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
  }) {
    const { userName } = payload
    const userInfo = await UserService.getUserInfo(userName)
    if (userInfo) {
      return new ErrorModel('10003')
    }
    payload.password = doCrypto(payload.password || '')
    try {
      await UserService.createUser(payload)
      return new SuccessModel({})
    } catch (error) {
      console.error(error.message, error.stack)
      return new ErrorModel('10001')
    }
  }

  /**
   * @description 用户登录
   * @date 2020-03-01
   * @param {ParameterizedContext} ctx
   * @param {string} userName
   * @param {string} password
   * @returns {Promise<ResultModel>}
   * @memberof UserController
   */
  async login(ctx: ParameterizedContext, userName: string, password: string) {
    const userInfo = await UserService.getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
      return new ErrorModel('10002')
    }
    if (!ctx.session.userInfo) {
      ctx.session.userInfo = userInfo
    }
    return new SuccessModel({})
  }

  /**
   * @description 删除当前用户
   * @date 2020-03-01
   * @param {string} userName
   * @returns {Promise<ResultModel>}
   * @memberof UserController
   */
  async deleteCurUser(userName: string) {
    const result = await UserService.deleteUser(userName)
    if (result) {
      return new SuccessModel(true)
    }
    return new ErrorModel('10006')
  }

  /**
   * @description 修改用户信息
   * @date 2020-03-01
   * @param {ParameterizedContext} ctx
   * @param {{
   *       nickName: string
   *       picture: string
   *       city: string
   *     }} payload
   * @returns
   * @memberof UserController
   */
  async changeInfo(
    ctx: ParameterizedContext,
    payload: {
      nickName: string
      picture: string
      city: string
    }
  ) {
    const { userName } = ctx.session.userInfo
    const result = await UserService.updateUser(payload, {
      userName
    })
    if (result) {
      Object.assign(ctx.session.userInfo, payload)
      return new SuccessModel(true)
    }

    return new ErrorModel('10008')
  }
}

export default new UserController()
