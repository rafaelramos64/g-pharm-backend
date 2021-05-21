/* global jest beforeAll test expect */
const { SalesServices, MedicinesServices } = require('../../../src/services')
jest.mock('../../../src/models')
const { Sales, Medicines, SalesMedicines, Vendors } = require('../../../src/models')

const defaltMedicine = {
  id: 1,
  name: 'dipidor',
  price: 23.55,
  purchase_date: '10/02/2010',
  due_date: '04/05/2022',
  stock: 8,
  pharmacy_id: 1
}

let salesServices
let medicinesServices
beforeAll(async () => {
  salesServices = new SalesServices(Sales, Medicines, SalesMedicines, Vendors)
  medicinesServices = new MedicinesServices(Medicines)

  Medicines.create.mockResolvedValue(defaltMedicine)
  await medicinesServices.create(
    defaltMedicine.name,
    defaltMedicine.price,
    defaltMedicine.purchase_date,
    defaltMedicine.due_date,
    defaltMedicine.stock,
    defaltMedicine.pharmacy_id
  )
  Medicines.findByPk.mockResolvedValue(defaltMedicine)
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

// test('It should insert a sale', async () => {
//   const sale =
//   {
//     id: 3,
//     salePrice: 499.75,
//     saleDate: '12/02/2021',
//     pharmacy_id: 1,
//     canceled: false,
//     vendorId: 1,
//     medicines: [
//       { id: 1, amount: 2, valueUnit: 2.33 },
//       { id: 1, amount: 2, valueUnit: 2.33 }
//     ]
//   }
//   Sales.create.mockResolvedValue(sale)
//   const response = await salesServices.create(sale.salePrice, sale.saleDate, sale.medicines, sale.vendorId, sale.pharmacy_id)
//   expect(response).toEqual(sale)
// })
