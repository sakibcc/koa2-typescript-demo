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

export class SuccessModel extends BaseModel {
  data: any
  constructor(data: any) {
    super(true, '10000')
    this.data = data
  }
}

export class ErrorModel extends BaseModel {
  message: string
  constructor(code: string) {
    super(false, code)
    this.message = getResCodeAndMessage(code)
  }
}
