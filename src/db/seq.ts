import { Sequelize, Options } from 'sequelize'
import { MYSQL_CONF } from '../conf/db'
import { isTest } from '../utils/env'

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

export default seq
