/**
 * @description blog 数据格式校验
 *
 */

import { validate } from './_validator'

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
export function blogValidate(data: object = {}): boolean {
  return validate(SCHEMA, data)
}
