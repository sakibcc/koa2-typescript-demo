/**
 * @description 用户路由
 */

import * as KoaRouter from 'koa-router'
import UserController from '../../controller/user'
import { genValidator } from '../../middlewares/validator'
import { userValidate } from '../../utils/validator/user'
const router = new KoaRouter()
router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await UserController.register({ userName, password, gender })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await UserController.isExist(userName)
})

export default router
