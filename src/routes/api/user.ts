/**
 * @description 用户路由
 */

import * as KoaRouter from 'koa-router'
import UserController from '../../controller/user'
import { genValidator } from '../../middlewares/validator'
import { userValidate } from '../../utils/validator/user'
import { isTest } from '../../utils/env'
import { loginCheck } from '../../middlewares/loginCheck'
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

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await UserController.login(ctx, userName, password)
})

// 测试环境下删除
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    const { userName } = ctx.session.userInfo
    ctx.body = await UserController.deleteCurUser(userName)
  }
})

// 修改个人信息
router.patch(
  '/changeInfo',
  loginCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { nickName, picture, city } = ctx.request.body
    ctx.body = await UserController.changeInfo(ctx, { nickName, picture, city })
  }
)
export default router
