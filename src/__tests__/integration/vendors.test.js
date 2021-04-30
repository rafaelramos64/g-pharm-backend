/* global describe test expect */
const request = require('supertest')
const app = require('../../app')

const API_USER = '/api/vendors'

describe('Test routes vendors', () => {
  test('It should add a new vendor', async () => {
    const newVendor = { name: 'fulano', email: 'fulano@nada.com', password: 'Edm@rques008' }

    const response = await request(app).post(API_USER).send(newVendor)
    expect(response.statusCode).toBe(201)
  })

  test('It should delete a vendor', async () => {
    const idVendor = 1

    const response = await request(app).delete(API_USER + `/${idVendor}`)
    expect(response.statusCode).toBe(200)
  })
})
