import server from './server'

const userName = 'sakibcc'
const password = '123'
// @ts-ignore
global.getCookie = async function() {
  const res = await server.post('/api/user/login').send({
    userName,
    password
  })
  return res.header['set-cookie'].join(';')
}
