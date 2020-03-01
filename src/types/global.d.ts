import { BaseContext } from 'koa'
import { Session } from 'koa-session'
import { UserInfo } from './index'

// declare
declare module 'koa-session' {
  interface Session {
    userInfo: UserInfo
  }
}
declare module 'koa' {
  interface BaseContext {
    render(str: string, config: object): Promise<any>
    session: Session
  }
}
