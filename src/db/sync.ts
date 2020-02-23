import { seq } from './seq'

seq.sync().then(() => {
  console.log('sync ok')
  process.exit()
})
