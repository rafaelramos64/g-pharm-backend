/* global beforeAll afterAll describe test expect */
const request = require('supertest')
const app = require('../../app')
const { signin } = require('../helpers')

const database = require('../../database')

const API_PHARMACY = '/api/pharmacies'
const API_VENDOR = '/api/vendors/1'
const DEFAULT_PHARMACY = { name: 'Super Pharm', email: 'pharmsuper@pharm.com', description: 'Farmácia do rémedio mais caro do mundo.', password: '12@Erofdaf' }
const DEFAULT_VENDOR = { name: 'fulano', email: 'fulano@nada.com', password: 'Edm@rques008' }

let PHARMACY_TOKEN = ''
beforeAll(async () => {
  PHARMACY_TOKEN = await signin()
  // await database.sync({ force: true })
  await request(app).post(API_PHARMACY).set('Authorization', `Bearer ${PHARMACY_TOKEN}`).send(DEFAULT_PHARMACY)
  await request(app).post(API_VENDOR).set('Authorization', `Bearer ${PHARMACY_TOKEN}`).send(DEFAULT_VENDOR)
})

afterAll(async () => {
  await database.close()
})

describe('Test routes pharmacies', () => {
  test('It should add a new pharmacy', async () => {
    const newPharmacy = { name: 'Farmácia dos pobres', email: 'pharmpoor@pharmacy.com', description: 'Aqui você acaba de falir', password: 'dfal7&Ufa11' }

    const response = await request(app).post(API_PHARMACY).set('Authorization', `Bearer ${PHARMACY_TOKEN}`).send(newPharmacy)
    expect(response.statusCode).toBe(201)
  })
})
