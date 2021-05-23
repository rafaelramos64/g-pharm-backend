const yup = require('yup')
const { MedicinesServices } = require('../services')
const { Medicines } = require('../models')

const medicinesServices = new MedicinesServices(Medicines)
module.exports = {
  async create (request, response) {
    const {
      name,
      price,
      purchaseDate,
      dueDate,
      stock
    } = request.body

    const pharmacyId = request.userId

    const schemaBody = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required(),
      purchaseDate: yup.date().required(),
      dueDate: yup.date().required(),
      stock: yup.number().required()
    })

    try {
      await schemaBody.validate(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error)
    }

    try {
      const medicine = await medicinesServices.create(
        name,
        price,
        purchaseDate,
        dueDate,
        stock,
        pharmacyId
      )

      return response.status(200).json(medicine)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async getAll (request, response) {
    const pharmacyId = request.userId

    try {
      const medicines = await medicinesServices.getAll(pharmacyId)

      return response.status(200).json(medicines)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async getByName (request, response) {
    const pharmacyId = request.userId
    const { name } = request.body

    const schemaBody = yup.object.shape({
      name: yup.string().required()
    })

    try {
      await schemaBody.validate(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error.errors)
    }

    try {
      const medicines = await medicinesServices.getByName(name, pharmacyId)

      return response.status(200).json(medicines)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async getById (request, response) {
    const { medicineId } = request.params
    const pharmacyId = request.userId

    const schemaParams = yup.object().shape({
      medicineId: yup.number().required()
    })

    try {
      await schemaParams.validate(request.params, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error.errors)
    }

    try {
      const medicine = await medicinesServices.getById(medicineId, pharmacyId)

      return response.status(200).json(medicine)
    } catch (error) {
      response.status(400).json(error.message)
    }
  },

  async changeById (request, response) {
    const pharmacyId = request.userId
    const { medicineId } = request.params
    const {
      name,
      price,
      purchaseDate,
      dueDate,
      stock
    } = request.body

    const schemaBody = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required(),
      purchaseDate: yup.date().required(),
      dueDate: yup.date().required(),
      stock: yup.number().required()
    })

    const schemaParams = yup.object().shape({
      medicineId: yup.number().required()
    })

    try {
      await schemaParams.validate(request.params, { abortEarly: false })
      await schemaBody.validate(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error.errors)
    }

    try {
      const data = {
        name,
        price,
        purchaseDate,
        dueDate,
        stock
      }

      const medicine = await medicinesServices.changeById(medicineId, pharmacyId, data)

      return response.status(201).json(medicine)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async deleteById (request, response) {
    const { medicineId } = request.params
    const pharmacyId = request.userId

    const schemaParams = yup.object().shape({
      medicineId: yup.number().required()
    })

    try {
      await schemaParams.validate(request.params, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error.errors)
    }

    try {
      const medicine = await medicinesServices.deleteById(medicineId, pharmacyId)

      return response.status(200).json(medicine)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
