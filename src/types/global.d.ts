import { BaseContext } from 'koa'
import { IncomingMessage } from 'http'
import { Session } from 'koa-session'
import { User } from '../db/seq'
import { Files, Fields } from 'formidable'

// declare
declare module 'koa-session' {
  interface Session {
    userInfo: User
  }
}
declare module 'koa' {
  interface BaseContext {
    render(str: string, config?: object): Promise<any>
    session: Session
  }
}

declare module 'http' {
  interface IncomingMessage {
    files: Files
    fields: Fields
  }
}
