const { Vendors, Pharmacies } = require('../models')
const { AuthServices } = require('../services')
const yup = require('yup')

const authVendorsServices = new AuthServices(Vendors)
const authPharmaciesServices = new AuthServices(Pharmacies)

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string()
    .required()
    .min(8)
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/)
})
module.exports = {
  async loginVendor (request, response) {
    const { email, password } = request.body

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({ error: error.errors })
    }

    try {
      const { token, dataEntite } = await authVendorsServices.signin(email, password)
      response.status(201).json({ auth: true, token, entite: dataEntite })
    } catch (error) {
      response.status(401).json({ auth: false, token: null, error: error.message })
    }
  },

  async loginPharmacy (request, response) {
    const { email, password } = request.body

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({ error: error.errors })
    }

    try {
      const { token, dataEntite } = await authPharmaciesServices.signin(email, password)
      response.status(201).json({ auth: true, token, entite: dataEntite })
    } catch (error) {
      response.status(401).json({ auth: false, token: null, error: error.message })
    }
  }
}
