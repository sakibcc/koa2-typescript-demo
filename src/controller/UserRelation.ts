/**
 *  @description 用户关系 controller
 */

import UserRelationService from '../services/userRelation'
import { SuccessModel, ErrorModel } from '../model/ResModel'

class UserRelationController {
  async getFans(userId: number) {
    try {
      const result = await UserRelationService.getUsersByFollower(userId)
      const { userList: fansList, count } = result
      return new SuccessModel({
        fansList,
        count
      })
    } catch (error) {
      return new ErrorModel('10001')
    }
  }
  async getFollowers(userId: number) {
    try {
      const result = await UserRelationService.getFollowersByUser(userId)
      return new SuccessModel(result)
    } catch (error) {
      return new ErrorModel('10001')
    }
  }
}
export default new UserRelationController()
