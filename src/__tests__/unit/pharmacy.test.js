/* global jest beforeAll test expect */
const { PharmaciesServices } = require('../../../src/services')
jest.mock('../../../src/models')
const { Pharmacies } = require('../../../src/models')

let pharmaciesServices
beforeAll(() => {
  pharmaciesServices = new PharmaciesServices(Pharmacies)
})

test('It should fetch all pharmacies', async () => {
  const pharmacies = [
    {
      id: 1,
      name: 'O Globo',
      description: 'Tudo girando',
      id_admin: 1
    },
    {
      id: 2,
      name: 'Farmácia dos Pobres',
      description: 'Aqui sua pobresa só aumenta',
      id_admin: 2
    }
  ]
  Pharmacies.findAll.mockResolvedValue(pharmacies)
  const resp = await pharmaciesServices.getAll()
  expect(resp).toEqual(pharmacies)
  expect(Pharmacies.findAll).toHaveBeenCalledWith({
    attributes: ['id', 'name', 'description', 'id_admin']
  })
})
