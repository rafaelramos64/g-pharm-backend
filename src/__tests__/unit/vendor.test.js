/* global jest beforeAll test expect */
const { VendorsServices } = require('../../../src/services')
jest.mock('../../../src/models')
const { Vendors } = require('../../../src/models')

let vendorsServices
beforeAll(() => {
  vendorsServices = new VendorsServices(Vendors)
})

test('It should fetch all vendors', async () => {
  const vendors = [{ id: 1, name: 'Fulano 1', email: 'fulano1@email.com' }, { id: 2, name: 'Fulano 2', email: 'fulano2@email.com' }]
  Vendors.findAll.mockResolvedValue(vendors)
  const response = await vendorsServices.getAll()
  expect(response).toEqual(vendors)
})

test('It should insert a vendor', async () => {
  const vendor3 = {
    id: 3,
    name: 'fulano3',
    email: 'fulano3@email.com',
    password: 'fdl%jls$fjD9',
    pharmacy_id: 1
  }
  Vendors.create.mockResolvedValue(vendor3)
  const response = await vendorsServices.create(vendor3)
  expect(response).toEqual(vendor3)
})

test('It should delete a vendor', async () => {
  const vendor4 = {
    id: 4,
    name: 'fulano4',
    email: 'fulano4@email.com',
    password: 'eiwierwocd'
  }
  Vendors.destroy.mockResolvedValue(vendor4)
  const response = await vendorsServices.delete(vendor4.id)
  expect(response).toEqual(vendor4)
})
