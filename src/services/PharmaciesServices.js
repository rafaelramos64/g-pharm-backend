const bcrypt = require('bcrypt')

const SALT = 8

class PharmaciesServices {
  constructor (Pharmacies) {
    this.pharmacies = Pharmacies
  }

  async create (name, description, email, password) {
    const dataPharmacy = { name, description, email, password: bcrypt.hashSync(password, SALT) }

    try {
      return await this.pharmacies.create(dataPharmacy)
    } catch (error) {
      // console.error('at PharmaciesServices', error)
      throw new Error(error)
    }
  }

  async getAll () {
    try {
      return await this.pharmacies.findAll({
        attributes: ['id', 'name', 'description']
      })
    } catch (error) {
      // console.error('at PharmaciesServices', error)
      throw new Error(error)
    }
  }
}

module.exports = { PharmaciesServices }
