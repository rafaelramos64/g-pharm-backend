const { Pharmacies } = require('../models')
const { PharmaciesServices } = require('../services')
const yup = require('yup')

const pharmaciesServices = new PharmaciesServices(Pharmacies)

module.exports = {
  async save (request, response) {
    const { name, description } = request.body
    const idAdmin = !request.body.id_admin ? null : request.body.id_admin

    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
      id_admin: yup.number()
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      console.error(error)
      return response.status(400).json({ message: error })
    }

    const dataPharmacy = { name, description, id_admin: idAdmin }

    try {
      await pharmaciesServices.create(dataPharmacy.name, dataPharmacy.description, dataPharmacy.id_admin)
      return response.status(201).json({ name, description })
    } catch (error) {
      console.error('at PharmaciesController', error)
      return response.status(500).json(error)
    }
  }
}
