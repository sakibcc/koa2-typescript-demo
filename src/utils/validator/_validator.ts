/**
 * @description 封装 json schame 校验
 */

import * as Ajv from 'ajv'
const ajv = new Ajv()

/**
 * @description 校验函数
 * @date 2020-02-27
 * @export
 * @param {object} schame 校验规则
 * @param {object} [data={}] 待校验数据
 * @returns {boolean}
 */
export function validate(schame: object, data: object = {}): boolean {
  const valid = ajv.validate(schame, data)
  return !!valid
}
