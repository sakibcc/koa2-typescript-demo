/**
 * @description 个人主页 controller
 */
import { SuccessModel, ErrorModel } from '../model/ResModel'
import { PAGE_SIZE } from '../conf/constant'
import { getSquareCacheList } from '../cache/blogCache'
class BlogProfileController {
  async getSquareBlogList(pageNo: number = 0, pageSize: number = PAGE_SIZE) {
    try {
      const result = await getSquareCacheList(pageNo, pageSize)
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
