/* global jest beforeAll test expect */
const { VendorsServices, PharmaciesServices } = require('../../../src/services')
jest.mock('../../../src/models')
const { Vendors, Pharmacies } = require('../../../src/models')

let vendorsServices
let pharmaciesServices
const dataPharm = {
  id: 1,
  name: 'Farmácia dos Pobres',
  description: 'Aqui você acaba de falir!',
  email: 'pharmpobre6@pharmpoor.com',
  password: 'Ph@rmacy0'
}
beforeAll(async () => {
  vendorsServices = new VendorsServices(Vendors, Pharmacies)
  pharmaciesServices = new PharmaciesServices(Pharmacies)
  Pharmacies.create.mockResolvedValue(dataPharm)
  Pharmacies.findByPk.mockResolvedValue(dataPharm)
  await pharmaciesServices.create(dataPharm.name, dataPharm.description, dataPharm.email, dataPharm.password)
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
    email: 'fulano10@email.com',
    password: 'fdl%jls$fjD9',
    pharmacy_id: 1
  }
  Vendors.create.mockResolvedValue(vendor3)
  Vendors.findAll.mockResolvedValue(vendor3)
  const response = await vendorsServices.create(vendor3.name, vendor3.email, vendor3.password, vendor3.pharmacy_id)
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
  const response = await vendorsServices.deleteById(vendor4.id, 1)
  expect(response).toEqual(vendor4)
})
