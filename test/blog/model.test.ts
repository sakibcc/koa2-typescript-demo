/**
 * @description model 测试
 */

import { Blog } from '../../src/db/seq'

describe('测试blog model', () => {
  test('User 模型的各个属性符合预期', () => {
    const blog = new Blog({
      userId: 1,
      content: '这是一个测试数据内容',
      image: '/test.png'
    })
    expect(blog.userId).toBe(1)
    expect(blog.content).toBe('这是一个测试数据内容')
    expect(blog.image).toBe('/test.png')
  })
})
