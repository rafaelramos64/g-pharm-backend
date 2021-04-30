/* global describe test expect */
const request = require('supertest')
const app = require('../../app')

const API_VENDOR = '/api/vendors'

describe('Test routes vendors', () => {
  test('It should add a new vendor', async () => {
    const newVendor = { name: 'fulano', email: 'fulano45@nada.com', password: 'Edm@rques008', pharmacy_id: 1 }

    const response = await request(app).post(API_VENDOR).send(newVendor)
    expect(response.statusCode).toBe(201)
  })

  test('It should delete a vendor', async () => {
    const idVendor = 1

    const response = await request(app).delete(API_VENDOR + `/${idVendor}`)
    expect(response.statusCode).toBe(200)
  })
})
