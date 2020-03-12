/**
 * @description 统一返回结构模式
 */
import { getResCodeAndMessage } from '../conf/resCode'
export class BaseModel {
  status: boolean
  code: string
  constructor(status: boolean, code: string) {
    this.status = status
    this.code = code
  }
}

export class SuccessModel<T> extends BaseModel {
  data: T
  constructor(data: T) {
    super(true, '10000')
    this.data = data
  }
}

export class ErrorModel extends BaseModel {
  message: string
  constructor(code: string, message?: string) {
    super(false, code)
    this.message = message || getResCodeAndMessage(code)
  }
}
