/**
 * @description sequelize 同步数据库
 */
import seq from './seq'

// 测试链接
seq
  .authenticate()
  .then(() => {
    console.log('ok')
  })
  .catch(() => {
    console.log('err')
  })

// 执行同步
seq.sync().then(() => {
  console.log('sync ok')
  process.exit()
})
