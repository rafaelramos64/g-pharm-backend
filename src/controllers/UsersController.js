const { Users } = require('../models')
const { UsersServices } = require('../services')
const yup = require('yup')

const usersServices = new UsersServices(Users)

module.exports = {
  async save (request, response) {
    const { name, email } = request.body

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required()
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      console.error(error)
      return response.status(400).json({ message: error })
    }

    try {
      await usersServices.create(name, email)
      return response.status(201).json({ name, email })
    } catch (error) {
      console.error('at UserController', error)
      return response.status(500).json(error)
    }
  },

  async deleteUser (request, response) {
    const id = request.params.id

    if (id) {
      const user = await usersServices.delete(id)

      if (user.error) return response.status(400).json(user)

      return response.status(200).json(user)
    } else {
      return response.status(400).json({ message: 'Id is required!' })
    }
  }
}
