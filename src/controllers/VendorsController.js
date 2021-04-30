const { Vendors, Pharmacies } = require('../models')
const { VendorsServices } = require('../services')
const yup = require('yup')

const vendorsServices = new VendorsServices(Vendors, Pharmacies)

module.exports = {
  async save (request, response) {
    const { name, email, password } = request.body
    const { pharmacy_id } = request.params

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string()
        .required()
        .min(8)
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/),
      pharmacy_id: yup.number().required()
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      // console.error(error)
      return response.status(400).json({ message: error.errors })
    }

    try {
      await vendorsServices.create(name, email, password, pharmacy_id)
      return response.status(201).json({ name, email })
    } catch (error) {
      // console.error('at VendorController', error)
      return response.status(400).json(error.message)
    }
  },

  async deleteUser (request, response) {
    const id = request.params.id

    if (id) {
      const vendor = await vendorsServices.delete(id)

      if (vendor.error) return response.status(400).json(vendor)

      return response.status(200).json(vendor)
    } else {
      return response.status(400).json({ message: 'Id is required!' })
    }
  }
}
