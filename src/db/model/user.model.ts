import {
  Model,
  Table,
  Column,
  Unique,
  DataType,
  Default,
  Comment,
  AllowNull
} from 'sequelize-typescript'

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

  @AllowNull(false)
  @Comment('图片地址')
  @Column
  picture: string

  @AllowNull(false)
  @Comment('城市')
  @Column
  city: string
}
