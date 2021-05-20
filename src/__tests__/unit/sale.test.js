/* global jest beforeAll test expect */
const { SalesServices } = require('../../../src/services')
jest.mock('../../../src/models')
const { Sales } = require('../../../src/models')

let salesServices
beforeAll(() => {
  salesServices = new SalesServices(Sales)
})

test('It should fetch all sales', async () => {
  const sales = [
    { id: 1, sale_price: 10.89, sale_date: '10/02/2021', pharmacy_id: 1, canceled: false, vendor_id: 1 },
    { id: 1, sale_price: 6.89, sale_date: '90/02/2021', pharmacy_id: 1, canceled: false, vendor_id: 1 }
  ]
  Sales.findAll.mockResolvedValue(sales)
  const response = await salesServices.getAll()
  expect(response).toEqual(sales)
})

test('It should insert a sale', async () => {
  const sale =
    {
      id: 3,
      salePrice: 499.75,
      saleDate: new Date(),
      vendorId: 1,
      medicines: [
        { id: 1, amount: 2, valueUnit: 2.33 }
      ]
    }

  Sales.create.mockResolvedValue(sale)
  const response = await salesServices.create(sale)
  expect(response).toEqual(sale)
})
