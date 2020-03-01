/**
 * @description 功能api controller
 */

import { SuccessModel, ErrorModel } from '../model/ResModel'
import * as fs from 'fs-extra'
import * as path from 'path'
// 文件大小限制
const MAX_SIZE = 1024 * 1024 * 1024
// 储存目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 首次创建目录
fs.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fs.ensureDir(DIST_FOLDER_PATH)
  }
})

class UtilsController {
  /**
   * @description 保存上传文件
   * @date 2020-03-01
   * @param {{
   *     size: number
   *     filePath: string
   *     name: string
   *     type?: string
   *   }} payload
   * @returns
   * @memberof UtilsController
   */
  async saveFile(payload: {
    size: number
    filePath: string
    name: string
    type?: string
  }) {
    const { size, filePath, name, type } = payload
    if (size > MAX_SIZE) {
      await fs.remove(filePath)
      return new ErrorModel('10007')
    }

    // 移动文件
    const fileName = `${Date.now()}.${name}`
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
    await fs.move(filePath, distFilePath)
    return new SuccessModel({
      url: `/${fileName}`
    })
  }
}

export default new UtilsController()
