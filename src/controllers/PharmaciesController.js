const { Pharmacies } = require('../models')
const { PharmaciesServices } = require('../services')
const yup = require('yup')

const pharmaciesServices = new PharmaciesServices(Pharmacies)

module.exports = {
  async save (request, response) {
    const { name, description, password } = request.body

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

    const dataPharmacy = { name, description, password }

    try {
      await pharmaciesServices.create(dataPharmacy.name, dataPharmacy.description, dataPharmacy.password)
      return response.status(201).json({ name, description })
    } catch (error) {
      console.error('at PharmaciesController', error)
      return response.status(400).json(error.message)
    }
  }
}
