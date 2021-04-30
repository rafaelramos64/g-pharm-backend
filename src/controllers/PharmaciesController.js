const { Pharmacies } = require('../models')
const { PharmaciesServices } = require('../services')
const yup = require('yup')

const pharmaciesServices = new PharmaciesServices(Pharmacies)

module.exports = {
  async save (request, response) {
    const { name, description, email, password } = request.body

    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string()
        .required()
        .min(8)
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/)
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      // console.error(error)
      return response.status(400).json({ message: error.errors })
    }

    const dataPharmacy = { name, description, email, password }

    try {
      await pharmaciesServices.create(
        dataPharmacy.name,
        dataPharmacy.description,
        dataPharmacy.email,
        dataPharmacy.password
      )
      return response.status(201).json({ name, description })
    } catch (error) {
      // console.error('at PharmaciesController', error)
      return response.status(400).json(error.message)
    }
  }
}
