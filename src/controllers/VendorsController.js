const { Vendors, Pharmacies } = require('../models')
const { VendorsServices } = require('../services')
const yup = require('yup')

const vendorsServices = new VendorsServices(Vendors, Pharmacies)

module.exports = {
  async save (request, response) {
    const { name, email, password } = request.body
    const pharmacyId = request.userId
    console.log(request.userId)

    const schemaBody = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string()
        .required()
        .min(8)
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/)
    })

    try {
      await schemaBody.validate(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({ message: error.errors })
    }

    try {
      await vendorsServices.create(name, email, password, pharmacyId)
      return response.status(201).json({ name, email })
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async getAll (request, response) {
    const pharmacyId = request.userId

    try {
      const vendors = await vendorsServices.getAll(pharmacyId)

      return response.status(200).json(vendors)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async getById (request, response) {
    const { vendorId } = request.params
    const pharmacyId = request.userId

    const schemaParams = yup.object().shape({
      vendorId: yup.number().required()
    })

    try {
      await schemaParams.validate(request.params, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error.errors)
    }

    try {
      const vendor = await vendorsServices.getById(vendorId, pharmacyId)

      return response.status(200).json(vendor)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async deleteById (request, response) {
    const { vendorId } = request.params
    const pharmacyId = request.userId

    const schemaParams = yup.object().shape({
      vendorId: yup.number().required()
    })

    try {
      await schemaParams.validate(request.params, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error.errors)
    }

    try {
      const vendor = await vendorsServices.deleteById(vendorId, pharmacyId)

      return response.status(200).json(vendor)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
