/**
 * @description 环境参数
 */
const ENV = process.env.NODE_ENV

export const isDev: boolean = ENV === 'dev'
