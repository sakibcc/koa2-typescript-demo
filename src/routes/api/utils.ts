/**
 * @description 功能api
 */

import * as KoaRouter from 'koa-router'
import { formKoaUpload } from '../../middlewares/formidableUpload'
import UtilsController from '../../controller/utils'
import { TEMP_FILES_PATH } from '../../conf/constant'
const router = new KoaRouter()

router.prefix('/api/utils')

// 上传图片
router.post(
  '/upload',
  formKoaUpload({
    uploadDir: TEMP_FILES_PATH
  }),
  async (ctx, next) => {
    const file = ctx.req.files['file']
    if (!file) return
    const { size, path, name, type } = file
    ctx.body = await UtilsController.saveFile({
      size,
      name,
      type,
      filePath: path
    })
  }
)

export default router
