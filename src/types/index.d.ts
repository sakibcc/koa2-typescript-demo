import { BaseContext } from 'koa'
declare module 'koa' {
  interface BaseContext {
    render(str: string, config: object): any
  }
}
