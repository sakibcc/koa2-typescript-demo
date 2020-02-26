/**
 * @description 加密方法
 */

const crypto = require('crypto')
import { SECRET_KEY } from '../conf/constant'

/**
 * @description md5加密
 * @date 2020-02-26
 * @param {string} content
 * @returns {string}
 */
function md5(content: string): string {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * @description 密码加密
 * @date 2020-02-26
 * @param {string} content
 * @returns {string}
 */
export function doCrypto(content: string): string {
  const str = `password=${content}$key=${SECRET_KEY}`
  return md5(str)
}
