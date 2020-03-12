import { Sequelize } from 'sequelize-typescript'
import { Options } from 'sequelize'
import { MYSQL_CONF } from '../conf/db'
import { isTest } from '../utils/env'
// models
import User from './model/user.model'
import Blog from './model/blog.model'

const { host, user, password, database } = MYSQL_CONF
const conf: Options = {
  host,
  dialect: 'mysql'
}

if (isTest) {
  // tslint:disable-next-line
  conf.logging = () => {}
}

const seq = new Sequelize(database, user, password, conf)

// seq.addModels([__dirname + '/model'])
seq.addModels([User, Blog])

// 测试拦截
seq
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

export { seq, User, Blog }
