/**
 * @description 用户关注关系表
 */

import {
  Model,
  Table,
  Column,
  Comment,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript'
import User from './user.model'

@Table({
  tableName: 'user_relation'
})
export default class UserRelationTable extends Model<UserRelationTable> {
  @ForeignKey(() => User)
  @Comment('用户id')
  @Column
  userId: number

  @ForeignKey(() => User)
  @Comment('被关注的id')
  @Column
  followerId: number

  @BelongsTo(() => User, 'followerId')
  user: User
}
