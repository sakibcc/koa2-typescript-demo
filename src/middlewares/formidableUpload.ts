/**
 * @description 文件上传中间件
 */

import * as formidable from 'formidable'

import { Middleware, Next, ParameterizedContext } from 'koa'
import { KoaUploadOptions } from '../types'
export function formKoaUpload(options?: KoaUploadOptions): Middleware {
  return async function(ctx: ParameterizedContext, next: Next) {
    let form = new formidable.IncomingForm()
    Object.assign(form, options)
    await new Promise((resolve, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        if (err) return reject(err)
        ctx.req.fields = fields
        ctx.req.files = files
        resolve()
      })
    })
    await next()
  }
}
