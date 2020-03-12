/**
 * @description blog Services处理
 */

import { Blog, User } from '../db/seq'
import { formatUser } from '../helper/_format'

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
    return dataValues as Blog
  }

  async getBlogListByUser(payload: {
    userName: string
    pageNo: number
    pageSize: number
  }) {
    const { userName, pageNo, pageSize } = payload
    const userParams: any = {}
    if (userName) {
      userParams.userName = userName
    }
    // 查询
    const result = await Blog.findAndCountAll({
      limit: pageSize,
      offset: pageSize * pageNo,
      order: [['id', 'desc']],
      include: [
        {
          model: User,
          attributes: ['userName', 'nickName', 'picture'],
          where: userParams
        }
      ]
    })
    result.rows.forEach(item => {
      item.user = formatUser(item.user)
    })
    return result
  }
}

export default new BlogService()
