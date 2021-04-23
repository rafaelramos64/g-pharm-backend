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
  const response = await pharmaciesServices.getAll()
  expect(response).toEqual(pharmacies)
  expect(Pharmacies.findAll).toHaveBeenCalledWith({
    attributes: ['id', 'name', 'description', 'id_admin']
  })
})

test('It should insert a pharmacy', async () => {
  const pharmacie3 = {
    id: 3,
    name: 'PagMenos',
    description: 'Deixe o olho da sua cara aqui',
    id_admin: 3
  }
  Pharmacies.create.mockResolvedValue(pharmacie3)
  const response = await pharmaciesServices.create(pharmacie3)
  expect(response.id).toEqual(pharmacie3.id)
  expect(response.name).toEqual(pharmacie3.name)
  expect(response.description).toEqual(pharmacie3.description)
  expect(response.id_admin).toEqual(pharmacie3.id)
})
