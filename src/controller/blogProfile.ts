/**
 * @description 个人主页 controller
 */
import { SuccessModel, ErrorModel } from '../model/ResModel'
import BlogService from '../services/blog'
import { PAGE_SIZE } from '../conf/constant'
class BlogProfileController {
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
}

export default new BlogProfileController()
