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

    const { pharmacyId } = request.params

    const schemaBody = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required(),
      purchaseDate: yup.date().required(),
      dueDate: yup.date().required(),
      stock: yup.number().required()
    })

    const schemaParams = yup.object().shape({
      pharmacyId: yup.number().required()
    })

    try {
      await schemaBody.validate(request.body, { abortEarly: false })
      await schemaParams.validate(request.params, { abortEarly: false })
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
      const medicines = await medicinesServices.getAll(pharmacyId)

      return response.status(200).json(medicines)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async getByName (request, response) {
    const { pharmacyId } = request.params
    const { name } = request.body

    const schemaParams = yup.object().shape({
      pharmacyId: yup.number().required()
    })
    const schemaBody = yup.object.shape({
      name: yup.string().required()
    })

    try {
      await schemaParams.validate(request.params, { abortEarly: false })
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
    const { medicineId, pharmacyId } = request.params

    const schemaParams = yup.object().shape({
      pharmacyId: yup.number().required(),
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
    const { medicineId, pharmacyId } = request.params

    try {
      const medicine = await medicinesServices.changeById(medicineId, pharmacyId)

      return response.status(201).json(medicine)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  },

  async deleteById (request, response) {
    const { medicineId, pharmacyId } = request.params

    const schemaParams = yup.object().shape({
      medicineId: yup.number().required(),
      pharmacyId: yup.number().required()
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
