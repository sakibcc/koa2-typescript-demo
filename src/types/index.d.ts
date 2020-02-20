import { BaseContext } from 'koa'
import { Session } from 'koa-session'

// declare
declare module 'koa' {
  interface BaseContext {
    render(str: string, config: object): any
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
