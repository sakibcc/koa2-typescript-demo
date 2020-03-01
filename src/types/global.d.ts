import { BaseContext } from 'koa'
import { IncomingMessage } from 'http'
import { Session } from 'koa-session'
import { UserInfo } from './index'
import { Files, Fields } from 'formidable'

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

declare module 'http' {
  interface IncomingMessage {
    files: Files
    fields: Fields
  }
}
