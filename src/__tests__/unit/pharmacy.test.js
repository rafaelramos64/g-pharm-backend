/* global jest beforeAll test expect */
const { PharmaciesServices } = require('../../../src/services')
jest.mock('../../../src/models')
const { Pharmacies } = require('../../../src/models')

let pharmaciesServices
beforeAll(() => {
  pharmaciesServices = new PharmaciesServices(Pharmacies)
})

test('It should fetch an pharmacy', async () => {
  const pharmacies = [
    {
      id: 1,
      name: 'O Globo',
      description: 'Tudo girando',
      email: 'globoo@test.com',
      password: '7439dfjalsM)'
    },
    {
      id: 2,
      name: 'Farmácia dos Pobres',
      email: 'poorpharm@test.com',
      description: 'Aqui sua pobresa só aumenta',
      password: 'djalsjdlfi3$M'
    }
  ]
  Pharmacies.findByPk.mockResolvedValue(pharmacies)
  const response = await pharmaciesServices.getByPk(1)
  expect(response).toEqual(pharmacies)
  expect(Pharmacies.findByPk).toHaveBeenCalledWith(1)
})

// test('It should insert a pharmacy', async () => {
//   const pharmacie3 = {
//     id: 3,
//     name: 'PagMenos',
//     email: 'menospag@test.com',
//     description: 'Deixe o olho da sua cara aqui',
//     password: 'eisa3ldfs$4M'
//   }
//   Pharmacies.create.mockResolvedValue(pharmacie3)
//   const response = await pharmaciesServices.create(pharmacie3)
//   expect(response.id).toEqual(pharmacie3.id)
//   expect(response.name).toEqual(pharmacie3.name)
//   expect(response.description).toEqual(pharmacie3.description)
// })
