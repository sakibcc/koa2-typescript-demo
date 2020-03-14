/**
 * @description 微博缓存
 */

import { get, set } from './_redis'
import BlogService from '../services/blog'
import { Blog } from '../db/seq'

// redis key 前缀
const KEY_PREFIX = 'weibo:square:'

export async function getSquareCacheList(pageNo: number, pageSize: number) {
  const key = `${KEY_PREFIX}${pageNo}_${pageSize}`
  const cacheResult = await get(key)
  if (cacheResult !== null) {
    return cacheResult as {
      rows: Blog[]
      count: number
    }
  }

  const result = await BlogService.getBlogListByUser({ pageNo, pageSize })

  set(key, result, 60)
  return result
}
