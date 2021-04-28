/* global describe test expect */
const request = require('supertest')
const app = require('../../app')

const API_USER = '/api/users'

describe('Test routes users', () => {
  test('It should add a new user', async () => {
    const newUser = { name: 'fulano', email: 'fulano@nada.com', password: 'Edm@rques008' }

    const response = await request(app).post(API_USER).send(newUser)
    expect(response.statusCode).toBe(201)
  })

  test('It should delete an user', async () => {
    const idUser = 1

    const response = await request(app).delete(API_USER + `/${idUser}`)
    expect(response.statusCode).toBe(200)
  })
})
