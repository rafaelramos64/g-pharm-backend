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
      password: yup
        .string()
        .required()
        .min(8)
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
        )
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({ message: error.errors })
    }

    try {
      const currentPharmacie = await pharmaciesServices.create(
        name,
        description,
        email,
        password
      )
      delete currentPharmacie.dataValues.password

      return response.status(201).json(currentPharmacie.dataValues)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async deleteById (request, response) {
    const { id } = request.params

    try {
      const pharmacie = pharmaciesServices.deleteById(id)

      return response.status(200).json(pharmacie)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
