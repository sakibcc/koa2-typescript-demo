/**
 * @description blog Services处理
 */

import { Blog } from '../db/seq'
import { BlogData } from '../types/index'

class BlogService {
  /**
   * @description 创建微博数据
   * @date 2020-03-02
   * @param {{
   *     userId: number
   *     content: string
   *     image?: string
   *   }} payload
   * @returns
   * @memberof BlogService
   */
  async createBlog(payload: {
    userId: number
    content: string
    image?: string
  }) {
    const { userId, content, image } = payload
    const result = await Blog.create({ userId, content, image })
    const dataValues = result.get({ plain: true })
    return dataValues as BlogData
  }
}

export default new BlogService()
