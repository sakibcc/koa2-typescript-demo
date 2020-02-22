/**
 * @description 环境参数
 */
const ENV = process.env.NODE_ENV

export const isDev: boolean = ENV === 'dev'
export const isPro: boolean = ENV === 'pro'
export const isTest: boolean = ENV === 'test'
