const yup = require('yup')
const { Sales } = require('../models')
const { SalesServices } = require('../services')

const salesServices = new SalesServices(Sales)
module.exports = {
  async create (request, response) {
    const { salePrice, saleDate, medicinesId, vendorId } = request.body

    const schema = yup.object().shape({
      salePrice: yup.number().required(),
      saleDate: yup.date().required(),
      medicinesId: yup.array(yup.number()).required(),
      vendorId: yup.number().required()
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error.errors)
    }

    try {
      const sale = await salesServices.create(
        salePrice,
        saleDate,
        medicinesId,
        vendorId
      )

      return response.status(201).json(sale)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async getAll (request, response) {
    try {
      const sales = await salesServices.getAll()

      return response.status(200).json(sales)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async getById (request, response) {
    const { id } = request.params

    try {
      const sale = await salesServices.getById(id)

      return response.status(200).json(sale)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async getByDate (request, response) {
    const { saleDate } = request.body

    try {
      const sale = await salesServices.getByDate(saleDate)

      return response.status(200).json(sale)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async deleteById (request, response) {
    const { id } = request.params

    try {
      const sale = await salesServices.deleteById(id)

      return response.status(200).json(sale)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
