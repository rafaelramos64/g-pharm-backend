/* global jest beforeAll test expect */
const { UsersServices } = require('../../../src/services')
jest.mock('../../../src/models')
const { Users } = require('../../../src/models')

let usersServices
beforeAll(() => {
  usersServices = new UsersServices(Users)
})

test('It should fetch all Users', async () => {
  const users = [{ id: 1, name: 'Fulano 1', email: 'fulano1@email.com' }, { id: 2, name: 'Fulano 2', email: 'fulano2@email.com' }]
  Users.findAll.mockResolvedValue(users)
  const response = await usersServices.getAll()
  expect(response).toEqual(users)
})

test('It should insert an user', async () => {
  const user3 = {
    id: 3,
    name: 'fulano3',
    email: 'fulano3@email.com'
  }
  Users.create.mockResolvedValue(user3)
  const response = await usersServices.create(user3)
  expect(response).toEqual(user3)
})

test('It should delete an user', async () => {
  const user4 = {
    id: 4,
    name: 'fulano4',
    email: 'fulano4@email.com'
  }
  Users.destroy.mockResolvedValue(user4)
  const response = await usersServices.delete(user4.id)
  expect(response).toEqual(user4)
})
