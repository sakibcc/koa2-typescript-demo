/**
 * @description 个人主页 controller
 */
import { SuccessModel, ErrorModel } from '../model/ResModel'
import BlogService from '../services/blog'
import UserRelationService from '../services/userRelation'
import { PAGE_SIZE } from '../conf/constant'
class BlogProfileController {
  /**
   * @description 获取主页博客列表
   * @date 2020-03-21
   * @param {string} userName
   * @param {number} [pageNo=0]
   * @returns
   * @memberof BlogProfileController
   */
  async getProfileBlogList(userName: string, pageNo: number = 0) {
    try {
      const result = await BlogService.getBlogListByUser({
        userName,
        pageNo,
        pageSize: PAGE_SIZE
      })
      const { rows: blogList, count } = result
      return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageNo,
        count
      })
    } catch (error) {
      console.error(error)
      return new ErrorModel('10001')
    }
  }

  /**
   * @description 关注
   * @date 2020-03-21
   * @param {number} userId
   * @param {number} followerId
   * @returns
   * @memberof BlogProfileController
   */
  async handleFollow(userId: number, followerId: number) {
    try {
      await UserRelationService.addFollower(userId, followerId)
      return new SuccessModel(true)
    } catch (error) {
      return new ErrorModel('30001')
    }
  }

  /**
   * @description 取消关注
   * @date 2020-03-21
   * @param {number} userId
   * @param {number} followerId
   * @returns
   * @memberof BlogProfileController
   */
  async removeFollow(userId: number, followerId: number) {
    try {
      await UserRelationService.removeFollower(userId, followerId)
      return new SuccessModel(true)
    } catch (error) {
      return new ErrorModel('10001')
    }
  }
}

export default new BlogProfileController()
