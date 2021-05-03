const yup = require('yup')
const { MedicinesServices } = require('../services')
const { Medicines } = require('../models')

const medicinesServices = new MedicinesServices(Medicines)
module.exports = {
  async create (request, response) {
    const {
      name,
      price,
      purchase_date,
      due_date,
      stock
    } = request.body

    const schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required(),
      purchase_date: yup.date().required(),
      due_date: yup.date().required(),
      stock: yup.number().required()
    })

    try {
      schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error.errors)
    }

    try {
      const medicine = await medicinesServices.create(
        name,
        price,
        purchase_date,
        due_date,
        stock
      )

      return response.status(200).json(medicine)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async getAll (request, response) {
    try {
      const medicines = await medicinesServices.getAll()

      return response.status(200).json(medicines)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async getByName (request, response) {
    const { name } = request.params

    try {
      const medicines = await medicinesServices.getByName(name)

      return response.status(200).json(medicines)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async getById (request, response) {
    const { id } = request.params

    try {
      const medicine = await medicinesServices.getById(id)

      return response.status(200).json(medicine)
    } catch (error) {
      response.status(400).json(error.message)
    }
  },

  async changeById (request, response) {
    const { id } = request.params

    try {
      const medicine = await medicinesServices.changeById(id)

      return response.status(201).json(medicine)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async deleteById (request, response) {
    const { id } = request.params

    try {
      const medicine = await medicinesServices.deleteById(id)

      return response.status(200).json(medicine)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
