/**
 * @description model 测试
 */

import { User } from '../../src/db/seq'

describe('测试user model', () => {
  test('User 模型的各个属性符合预期', () => {
    const user = new User({
      userName: 'zhangsan',
      password: '123123',
      nickName: '张三',
      // gender: 1,
      picture: '/xxx.png',
      city: '广州'
    })
    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('123123')
    expect(user.gender).toBe(3)
    expect(user.picture).toBe('/xxx.png')
    expect(user.nickName).toBe('张三')
    expect(user.city).toBe('广州')
  })
})
