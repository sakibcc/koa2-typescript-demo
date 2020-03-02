/**
 * @description 登录逻辑测试
 */

import server from '../server'

const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

let _cookie = ''

describe('测试登录逻辑', () => {
  // 注册
  test('注册一个用户', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.code).toBe('10000')
  })

  // 重复注册
  test('重复注册用户，应该失败', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.code).not.toBe('10000')
  })

  // 查询用户是否存在
  test('查询用户是否已经存在', async () => {
    const res = await server.post('/api/user/isExist').send({ userName })
    expect(res.body.code).toBe('10000')
  })

  // json schema 检测
  test('json schema 检测, 验证非法格式，注册应该失败', async () => {
    const res = await server.post('/api/user/register').send({
      userName: '123', // 用户名不是字母（或下划线）开头
      password: 'a', // 最小长度不小于 3
      gender: 'test' // 不是数字
    })

    expect(res.body.code).toBe('10004')
  })

  // 登录
  test('登录应该成功', async () => {
    const res = await server.post('/api/user/login').send({
      userName,
      password
    })
    expect(res.body.code).toBe('10000')
    _cookie = res.header['set-cookie'].join(';')
  })

  // 修改基本信息
  test('修改用户信息，应该成功', async () => {
    const res = await server
      .patch('/api/user/changeInfo')
      .send({
        nickName: '测试昵称',
        city: '测试城市',
        picture: '/test.png'
      })
      .set('cookie', _cookie)
    expect(res.body.code).toBe('10000')
  })

  // 修改密码
  test('修改用户密码，应该成功', async () => {
    const res = await server
      .patch('/api/user/changePassword')
      .send({
        password,
        newPassword: `np_${Date.now()}`
      })
      .set('cookie', _cookie)
    expect(res.body.code).toBe('10000')
  })

  // 删除测试用户
  test('删除测试用户，应该成功', async () => {
    const res = await server.post('/api/user/delete').set('cookie', _cookie)
    expect(res.body.code).toBe('10000')
  })

  // 退出登录
  test('退出登录，应该成功', async () => {
    const res = await server.post('/api/user/logout').set('cookie', _cookie)
    expect(res.body.code).toBe('10000')
  })

  // 删除后再次查询用户，应该不存在
  test('删除之后，再次查询用户，应该不存在', async () => {
    const res = await server.post('/api/user/isExist').send({ userName })
    expect(res.body.code).toBe('10003')
  })
})
