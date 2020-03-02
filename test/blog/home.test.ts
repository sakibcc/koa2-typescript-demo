/**
 * @description 微博首页test
 */

import server from '../server'
let blogId = ''
let cookie = ''
describe('测试微博首页逻辑', () => {
  // 创建博客
  test('创建一条微博，应该成功', async () => {
    // 测试内容
    const content = `单元测试自动创建的微博_${Date.now()}`
    const image = '/xxxx.png'
    // @ts-ignore
    cookie = await global.getCookie()
    // 开始测试
    const res = await server
      .post('/api/blog/create')
      .send({
        content,
        image
      })
      .set('cookie', cookie)
    expect(res.body.code).toBe('10000')
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)
  })
})
