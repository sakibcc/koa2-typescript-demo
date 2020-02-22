/**
 * @description 存储配置
 */

import { DatabaseConfig } from '../types'

const REDIS_CONF: DatabaseConfig = {
  port: 6379,
  host: '127.0.0.1'
}

const MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'fD852456',
  port: 3306,
  database: 'weibo_demo'
}

export { REDIS_CONF, MYSQL_CONF }
