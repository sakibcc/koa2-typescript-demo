/**
 * @description 用户关系 service
 */

import { User, UserRelation } from '../db/seq'
import { formatUser } from '../helper/_format'

class UserRelationService {
  /**
   * @description 获取用户的粉丝列表
   * @date 2020-03-21
   * @param {number} followerId
   * @returns
   * @memberof UserRelationService
   */
  async getUsersByFollower(followerId: number) {
    const result = await User.findAndCountAll({
      attributes: ['id', 'userName', 'nickName', 'picture'],
      order: [['id', 'desc']],
      include: [
        {
          model: UserRelation,
          where: {
            followerId
          }
        }
      ]
    })
    let { rows: userList, count } = result
    userList = formatUser(userList)
    return {
      userList,
      count
    }
  }
  /**
   * @description 获取关注人列表
   * @date 2020-03-22
   * @param {number} userId
   * @returns
   * @memberof UserRelationService
   */
  async getFollowersByUser(userId: number) {
    const result = await UserRelation.findAndCountAll({
      order: [['id', 'desc']],
      include: [
        {
          model: User,
          attributes: ['id', 'userName', 'nickName', 'picture']
        }
      ],
      where: {
        userId
      }
    })
    let { rows: userList, count } = result
    const followerList = userList.map(item => {
      item.user = formatUser(item.user)
      return item.user
    })
    return {
      followerList,
      count
    }
  }
  /**
   * @description 创建用户关联关系
   * @date 2020-03-21
   * @param {number} userId
   * @param {number} followerId
   * @returns
   * @memberof UserRelationService
   */
  async addFollower(userId: number, followerId: number) {
    const result = await UserRelation.create({
      userId,
      followerId
    })
    return result
  }

  /**
   * @description 删除关联关系
   * @date 2020-03-21
   * @param {number} userId
   * @param {number} followerId
   * @returns
   * @memberof UserRelationService
   */
  async removeFollower(userId: number, followerId: number) {
    const result = await UserRelation.destroy({
      where: {
        userId,
        followerId
      }
    })
    return result
  }
}

export default new UserRelationService()
