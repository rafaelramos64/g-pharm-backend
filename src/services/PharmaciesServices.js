const bcrypt = require('bcrypt')

const SALT = 8

class PharmaciesServices {
  constructor (Pharmacies) {
    this.pharmacies = Pharmacies
  }

  async create (name, description, email, password) {
    try {
      const dataPharmacy = {
        name,
        description,
        email,
        password: bcrypt.hashSync(password, SALT)
      }

      return await this.pharmacies.create(dataPharmacy)
    } catch (error) {
      // console.error('at PharmaciesServices', error)
      throw new Error(error)
    }
  }

  async getAll () {
    try {
      const medicines = await this.pharmacies.findAll({
        attributes: ['id', 'name', 'description']
      })

      if (!medicines) {
        throw new Error('Medicine does not Exists!')
      }

      return medicines
    } catch (error) {
      // console.error('at PharmaciesServices', error)
      throw new Error(error)
    }
  }
}

module.exports = { PharmaciesServices }
