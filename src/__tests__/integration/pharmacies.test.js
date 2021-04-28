/* global beforeAll afterAll describe test expect */
const request = require('supertest')
const app = require('../../app')

const database = require('../../database')

const API_PHARMACY = '/api/pharmacies'
const API_USER = '/api/users'
const DEFAULT_PHARMACY = { name: 'Super Pharm', description: 'Farmácia do rémedio mais caro do mundo.' }
const DEFAULT_USER = { name: 'fulano', email: 'fulano@nada.com', password: 'Edm@rques008', id_admin: 1 }
beforeAll(async () => {
  await database.sync({ force: true })
  await request(app).post(API_USER).send(DEFAULT_USER)
  await request(app).post(API_PHARMACY).send(DEFAULT_PHARMACY)
})

afterAll(async () => {
  await database.close()
})

describe('Test routes pharmacies', () => {
  test('It should add a new pharmacy', async () => {
    const newPharmacy = { name: 'Farmácia', description: 'Farmácia', id_Admin: 1 }

    const response = await request(app).post(API_PHARMACY).send(newPharmacy)
    expect(response.statusCode).toBe(201)
  })
})
