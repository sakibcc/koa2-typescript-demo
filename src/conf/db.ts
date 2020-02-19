/**
 * @description 存储配置
 */

import { DatabaseConfig } from '../types'

const REDIS_CONF: DatabaseConfig = {
  port: 6379,
  host: '127.0.0.1'
}

export { REDIS_CONF }
