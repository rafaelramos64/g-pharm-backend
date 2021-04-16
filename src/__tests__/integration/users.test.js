/* global beforeAll afterAll describe test expect */
const request = require('supertest')
const app = require('../../app')

const database = require('../../database')

const API_USER = '/api/users'
const DEFAULT_USER = { name: 'Edmarques Lima', email: 'edm.node@dev.com' }

describe('Test routes users', () => {
  beforeAll(async () => {
    await database.sync({ force: true })
    await request(app).post(API_USER).send(DEFAULT_USER)
  })

  afterAll(async () => {
    await database.close()
  })

  test('It should add new user', async () => {
    const newUser = { name: 'fulano', email: 'fulano@nada.com' }

    const response = await request(app).post(API_USER).send(newUser)
    expect(response.statusCode).toBe(201)
  })
})
