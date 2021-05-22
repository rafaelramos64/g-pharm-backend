const yup = require('yup')
const { Sales, Medicines, SalesMedicines, Vendors } = require('../models')
const { SalesServices } = require('../services')

const salesServices = new SalesServices(Sales, Medicines, SalesMedicines, Vendors)
module.exports = {
  async create (request, response) {
    const { salePrice, medicines, saleDate } = request.body
    const { vendorId } = request.params
    const pharmacyId = request.userId

    const schemaBody = yup.object().shape({
      saleDate: yup.date().required(),
      salePrice: yup.number().required(),
      medicines: yup.array(
        yup.object({
          id: yup.number(),
          amount: yup.number(),
          valueUnit: yup.number()
        })).required()
    })
    const schemaParams = yup.object().shape({
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
      return response.status(400).json(error.message)
    }
  },

  async getAll (request, response) {
    const pharmacyId = request.userId

    try {
      const sales = await salesServices.getAll(pharmacyId)

      return response.status(200).json(sales)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async getById (request, response) {
    const { saleId } = request.params
    const pharmacyId = request.userId

    const schemaParams = yup.object().shape({
      saleId: yup.number().required()
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
    const pharmacyId = request.userId

    const schemaBody = yup.object().shape({
      saleDate: yup.date().required()
    })

    try {
      await schemaBody.validate(request.body, { abortEarly: false })
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

  async cancelById (request, response) {
    const { saleId } = request.params
    const pharmacyId = request.userId

    const schemaParams = yup.object().shape({
      saleId: yup.number().required()
    })

    try {
      await schemaParams.validate(request.params, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error.errors)
    }

    try {
      const sale = await salesServices.cancelById(saleId, pharmacyId)

      return response.status(200).json(sale)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
