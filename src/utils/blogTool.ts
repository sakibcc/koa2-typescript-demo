/**
 * @description 微博相关的工具方法
 */
import { Blog } from '../db/seq'
import * as ejs from 'ejs'
import * as path from 'path'
import * as fs from 'fs'

const BLOG_LIST_TPL = fs
  .readFileSync(path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs'))
  .toString()

/**
 * @description
 * @date 2020-03-14
 * @export
 * @param {Blog[]} [blogList=[]]
 * @param {boolean} [canReply=false]
 * @returns
 */
export function getBlogListStr(
  blogList: Blog[] = [],
  canReply: boolean = false
) {
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply
  })
}
