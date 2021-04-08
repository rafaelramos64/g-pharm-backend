const { Users } = require('../models/Users')
const yup = require('yup')

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

    const user = await Users.create({ name, email })

    return response.status(201).json(user)
  }
}
