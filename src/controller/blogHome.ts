/**
 * @description 博客api controller
 */

import { SuccessModel, ErrorModel } from '../model/ResModel'
import BlogService from '../services/blog'

class BlogHomeController {
  /**
   * @description 创建微博
   * @date 2020-03-02
   * @param {{ userId: number; content: string; image?: string }} payload
   * @returns
   * @memberof BlogHomeController
   */
  async create(payload: { userId: number; content: string; image?: string }) {
    const { userId, content, image } = payload
    try {
      const blog = await BlogService.createBlog({ userId, content, image })
      return new SuccessModel(blog)
    } catch (error) {
      console.error(error.message, error.stack)
      return new ErrorModel('20001')
    }
  }
}

export default new BlogHomeController()
