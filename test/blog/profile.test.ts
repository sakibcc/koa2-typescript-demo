/**
 * @description 个人主页测试
 */

import server from '../server'
import { userName } from '../getCookie'
describe('个人主页测试', () => {
  test('个人主页，加载第一页数据，应该成功', async () => {
    // @ts-ignore
    const cookie = await global.getCookie()
    const res = await server
      .get(`/api/profile/loadMore/${userName}/0`)
      .set('cookie', cookie)
    expect(res.body.code).toBe('10000')
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageNo')
    expect(data).toHaveProperty('count')
  })
})
