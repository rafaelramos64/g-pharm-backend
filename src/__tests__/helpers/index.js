const bcrypt = require('bcrypt')
const request = require('supertest')
const app = require('../../app')
const sequelize = require('../../database')

const SALT = 8
const API_SIGNUP_PHARMACY = '/api/pharmacies'
const API_SIGNIN_PHARMACY = '/api/pharmacies/auth'

const PHARMACY_TEST = {
  name: 'O Globo',
  description: 'Tudo girando',
  email: 'globo@test.com',
  password: bcrypt.hashSync('Oglo&o93pdfa', SALT)
}

async function startDatabase () {
  await sequelize.sync({ force: true })
}

async function signup () {
  await startDatabase()
  await request(app).post(API_SIGNUP_PHARMACY).send(PHARMACY_TEST)
}

async function signin () {
  await signup()
  const response = await request(app).post(API_SIGNIN_PHARMACY).send(PHARMACY_TEST)
  return response.body.token
}

const helper = {
  PHARMACY_TEST,
  signin
}

module.exports = helper
