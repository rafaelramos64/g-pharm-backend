const { models } = require('../../../models/index')
const yup = require('yup')

module.exports = async (request, response) => {
  const { name, email } = request.body

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required()
  })

  try {
    await schema.validate(request.body, { abortEarly: false })
  } catch (error) {
    response.status(400).json({ message: error })
  }

  const newUser = models.users.create({ name, email })

  return response.status(201).json(newUser)
}
