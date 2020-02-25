/**
 * @description 用户路由
 */

import * as KoaRouter from 'koa-router'
import UserController from '../../controller/user'
const router = new KoaRouter()
router.prefix('/api/user')

// 注册路由
// router.post('/register', async (ctx, next) => {
//   const { userName, password, gender } = ctx.request.body
// })

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await UserController.isExist(userName)
})

export default router
