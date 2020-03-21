/**
 * @description 用户数据模型
 */

import {
  Model,
  Table,
  Column,
  Unique,
  DataType,
  Default,
  Comment,
  AllowNull,
  HasMany
} from 'sequelize-typescript'
import UserRelation from './userRelation.model'
@Table({
  tableName: 'user'
})
export default class UserTable extends Model<UserTable> {
  @AllowNull(false)
  @Unique
  @Comment('用户名，唯一')
  @Column
  userName: string

  @AllowNull(false)
  @Comment('密码')
  @Column
  password: string

  @AllowNull(false)
  @Comment('昵称')
  @Column
  nickName: string

  @AllowNull(false)
  @Default(3)
  @Comment('性别（1:男性，2:女性，3:保密）')
  @Column({
    type: DataType.DECIMAL
  })
  gender: number

  @Comment('图片地址')
  @Column
  picture: string

  @Comment('城市')
  @Column
  city: string

  @HasMany(() => UserRelation, 'userId')
  follower: UserRelation[]
}
