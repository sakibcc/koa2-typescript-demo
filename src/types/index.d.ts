import { BaseContext } from 'koa'
import { Session } from 'koa-session'

// declare
declare module 'koa-session' {
  interface Session {
    userInfo: UserInfo
  }
}
declare module 'koa' {
  interface BaseContext {
    render(str: string, config: object): void
    session: Session
  }
}

// type
export type RedisPromise = string | object

// interface
export interface DatabaseConfig {
  port: number
  host: string
}

export interface UserInfo {
  id?: number
  userName: string
  nickName: string
  gender: number
  picture?: string
  city?: string
  createdAt?: string
  updatedAt?: string
}

export interface ErrorMessage {
  code: string
  message: string
}
