import app from '../src/app'
import * as supertest from 'supertest'

const server = app.callback()

const request = supertest(server)

export default request
