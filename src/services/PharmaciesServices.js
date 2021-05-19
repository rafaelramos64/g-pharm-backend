const bcrypt = require('bcrypt')

const SALT = 8

class PharmaciesServices {
  constructor (Pharmacies) {
    this.pharmacies = Pharmacies
  }

  async create (name, description, email, password) {
    try {
      const pharmacyAlreadyExists = await this.pharmacies.findAll({
        where: { email }
      })

      if (pharmacyAlreadyExists && pharmacyAlreadyExists.length > 0) {
        throw new Error('Pharmacy already registered!')
      }

      const dataPharmacy = {
        name,
        description,
        email,
        password: bcrypt.hashSync(password, SALT)
      }

      return await this.pharmacies.create(dataPharmacy)
    } catch (error) {
      throw new Error(error)
    }
  }

  async getByPk (id) {
    try {
      const pharmacie = await this.pharmacies.findByPk(id)

      if (!pharmacie) {
        throw new Error('Pharmacy does not Exists!')
      }

      return pharmacie
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteById (id) {
    try {
      const pharmacie = await this.getByPk(id)

      if (!pharmacie) {
        throw new Error('Pharmacie does not exists!')
      }

      return await this.pharmacies.destroy({
        where: { id }
      })
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = { PharmaciesServices }
