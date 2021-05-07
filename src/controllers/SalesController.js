const yup = require('yup')
const { Sales } = require('../models')
const { SalesServices } = require('../services')

const salesServices = new SalesServices(Sales)
module.exports = {
  async create (request, response) {
    const { salePrice, medicines, saleDate } = request.body
    const { pharmacyId, vendorId } = request.params

    const schemaBody = yup.object().shape({
      saleDate: yup.date().required(),
      salePrice: yup.number().required(),
      medicines: yup.array(
        yup.object({
          id: yup.number(),
          amount: yup.number(),
          price: yup.number()
        })).required()
    })
    const schemaParams = yup.object().shape({
      pharmacyId: yup.number().required(),
      vendorId: yup.number().required()
    })

    try {
      await schemaBody.validate(request.body, { abortEarly: false })
      await schemaParams.validate(request.params, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error.errors)
    }

    try {
      const sale = await salesServices.create(
        salePrice,
        saleDate,
        medicines,
        vendorId,
        pharmacyId
      )

      return response.status(201).json(sale)
    } catch (error) {
      console.error('--------------------------------------------------------\n', error)
      return response.status(400).json(error.message)
    }
  },

  async getAll (request, response) {
    const { pharmacyId } = request.params

    const schemaParams = yup.object().shape({
      pharmacyId: yup.number().required()
    })

    try {
      await schemaParams.validate(request.params, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error.errors)
    }

    try {
      const sales = await salesServices.getAll(pharmacyId)

      return response.status(200).json(sales)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async getById (request, response) {
    const { saleId, pharmacyId } = request.params

    const schemaParams = yup.object().shape({
      saleId: yup.number().required(),
      pharmacyId: yup.number().required
    })

    try {
      await schemaParams.validate(request.params, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error.errors)
    }

    try {
      const sale = await salesServices.getById(saleId, pharmacyId)

      return response.status(200).json(sale)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async getByDate (request, response) {
    const { saleDate } = request.body
    const { pharmacyId } = request.params

    const schemaBody = yup.object().shape({
      saleDate: yup.date().required()
    })
    const schemaParams = yup.object().shape({
      pharmacyId: yup.number().required()
    })

    try {
      await schemaBody.validate(request.body, { abortEarly: false })
      await schemaParams.validate(request.params, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error.errors)
    }

    try {
      const sale = await salesServices.getByDate(saleDate, pharmacyId)

      return response.status(200).json(sale)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async deleteById (request, response) {
    const { saleId, pharmacyId } = request.params

    const schemaParams = yup.object().shape({
      saleId: yup.number().required(),
      pharmacyId: yup.number().required()
    })

    try {
      await schemaParams.validate(request.params, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error.errors)
    }

    try {
      const sale = await salesServices.deleteById(saleId, pharmacyId)

      return response.status(200).json(sale)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
