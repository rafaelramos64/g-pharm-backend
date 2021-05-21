/* global beforeAll describe test expect */
const request = require('supertest')
const app = require('../../app')
const { signin } = require('../helpers')

const API_VENDOR = '/api/vendors/1'
const API_PHARMACY = '/api/pharmacies'

const DEFAULT_PHARMACY = { name: 'Super Pharm', email: 'pharmsuper@pharm.com', description: 'Farmácia do rémedio mais caro do mundo.', password: '12@Erofdaf' }

let PHARMACY_TOKEN = ''
beforeAll(async () => {
  PHARMACY_TOKEN = await signin()
  // await database.sync({ force: true })
  await request(app).post(API_PHARMACY).set('Authorization', `Bearer ${PHARMACY_TOKEN}`).send(DEFAULT_PHARMACY)
})

describe('Test routes vendors', () => {
  test('It should add a new vendor', async () => {
    const newVendor = { name: 'fulano', email: 'fulan33o@nada.com', password: 'Edm@rques008' }

    const response = await request(app).post(API_VENDOR).set('Authorization', `Bearer ${PHARMACY_TOKEN}`).send(newVendor)
    expect(response.statusCode).toBe(201)
  })
})
