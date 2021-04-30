const bcrypt = require('bcrypt')

const SALT = 8

class VendorsServices {
  constructor (Vendors, Pharmacies) {
    this.vendors = Vendors
    this.pharmacies = Pharmacies
  }

  async create (name, email, password, pharmacyId) {
    const dataVendor = { name, email, password: bcrypt.hashSync(password, SALT), pharmacy_id: pharmacyId }

    try {
      const pharmacy = await this.pharmacies.findByPk(pharmacyId)

      if (!pharmacy) {
        throw new Error('Pharmacy does not exists!')
      }
    } catch (error) {
      throw new Error(error.message)
    }

    try {
      return await this.vendors.create(dataVendor)
    } catch (error) {
      // console.error('at VendorsServices', error)
      throw new Error(error)
    }
  }

  async getAll () {
    try {
      return await this.vendors.findAll({
        attributes: ['id', 'name', 'email', 'pharmacy_id']
      })
    } catch (error) {
      // console.error('at VendorsServices', error)
      throw new Error(error)
    }
  }

  async delete (id) {
    try {
      return await this.vendors.destroy({ where: { id } })
    } catch (error) {
      // console.error(error)
      throw new Error(error)
    }
  }
}

module.exports = { VendorsServices }
