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

export interface KoaUploadOptions {
  encoding?: string
  uploadDir?: string
  keepExtensions?: boolean
  maxFieldsSize?: number
  maxFields?: number
  hash?: boolean
  multiples?: boolean
}

export interface UpdateUserInfo {
  nickName?: string
  password?: string
  city?: string
  picture?: string
}
