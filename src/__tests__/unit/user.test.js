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
  const resp = await usersServices.getAll()
  expect(resp).toEqual(users)
})
