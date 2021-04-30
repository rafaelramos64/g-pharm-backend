const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authConfig = require('../config/authentication.json')

class AuthServices {
  constructor (model) {
    this.model = model
  }

  generateToken (entite) {
    const token = jwt.sign({ id: entite.id }, authConfig.secret, { expiresIn: '1h' })
    return token
  }

  async signin (email, password) {
    const entite = await this.model.findOne({
      where: { email }
    })

    if (!entite) {
      throw new Error('Invalid email or password')
    }

    const passwordIsValid = bcrypt.compareSync(password, entite.password)
    if (!passwordIsValid) {
      throw new Error('Invalid email or password')
    }

    const token = this.generateToken(entite)
    const { name } = entite
    return { token, dataEntite: { name, email } }
  }
}

module.exports = { AuthServices }
