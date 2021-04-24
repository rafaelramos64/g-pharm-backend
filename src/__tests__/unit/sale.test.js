/* global jest beforeAll test expect */
const { SalesServices } = require('../../../src/services')
jest.mock('../../../src/models')
const { Sales } = require('../../../src/models')

let salesServices
beforeAll(() => {
  salesServices = new SalesServices(Sales)
})

test('It should fetch all sales', async () => {
  const users = [
    { id: 1, price: 18.75, sale_date: new Date(), id_vendor: 1, id_medicines: [1, 4, 3] },
    { id: 2, price: 99.75, sale_date: new Date(), id_vendor: 1, id_medicines: [6, 7, 4, 3] }
  ]
  Sales.findAll.mockResolvedValue(users)
  const response = await salesServices.getAll()
  expect(response).toEqual(users)
})

test('It should insert an user', async () => {
  const sale = { id: 3, price: 499.75, sale_date: new Date(), id_vendor: 8, id_medicines: [1, 10, 6, 7, 4, 3] }

  Sales.create.mockResolvedValue(sale)
  const response = await salesServices.create(sale)
  expect(response).toEqual(sale)
})

// test('It should delete an user', async () => {
//   const user4 = {
//     id: 4,
//     name: 'fulano4',
//     email: 'fulano4@email.com'
//   }
//   Users.destroy.mockResolvedValue(user4)
//   const response = await usersServices.delete(user4.id)
//   expect(response).toEqual(user4)
// })
