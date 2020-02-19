/**
 * @description 链接redis的方法
 */

const redis: any = require('redis')
import { REDIS_CONF } from '../conf/db'
import { RedisPromise } from '../types'

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', (err: any) => {
  console.log('redis error', err)
})

/**
 * @description
 * @date 2020-02-18
 * @param {string} key 健
 * @param {string} val 值
 * @param {number} timeout 过期时间
 */
const DEFAULT_TIMEOUT = 60 * 60
export function set(
  key: string,
  val: string | object,
  timeout: number = DEFAULT_TIMEOUT
): void {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * @description
 * @date 2020-02-19
 * @export
 * @param {string} key 健
 * @returns {promise} 返回
 */
export function get(key: string): Promise<RedisPromise> {
  const promise = new Promise<RedisPromise>((resolve, reject) => {
    redisClient.get(key, (err: any, val?: string | null) => {
      if (err) {
        reject(err)
        return
      }
      if (val === null) {
        resolve(null)
        return
      }

      try {
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
  return promise
}
