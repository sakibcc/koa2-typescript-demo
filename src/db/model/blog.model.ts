/**
 * @description 博客数据模型
 */
import {
  Model,
  Table,
  Column,
  DataType,
  Comment,
  AllowNull,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript'
import User from './user.model'
@Table({
  tableName: 'blog'
})
export default class BlogTable extends Model<BlogTable> {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Comment('用户ID')
  @Column
  userId: number

  @AllowNull(false)
  @Comment('微博内容')
  @Column({
    type: DataType.TEXT
  })
  content: string

  @Comment('微博图片')
  @Column
  image: string

  @BelongsTo(() => User)
  user: User
}
