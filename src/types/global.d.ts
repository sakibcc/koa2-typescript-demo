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
