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
  BelongsTo,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript'
import User from './user.model'
import * as moment from 'moment'
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

  @CreatedAt
  @Column({
    type: DataType.DATE
  })
  get createdAt(): string {
    const time = this.getDataValue('createdAt')
    return moment(new Date(time)).format('YYYY年 M月DD日 HH:mm')
  }

  @UpdatedAt
  @Column({
    type: DataType.DATE
  })
  get updatedAt(): string {
    const time = this.getDataValue('updatedAt')
    return moment(new Date(time)).format('YYYY年 M月DD日 HH:mm')
  }

  @BelongsTo(() => User)
  user: User
}
