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

      const vendorAlreadyExists = await this.vendors.findAll({
        where: { email }
      })

      if (vendorAlreadyExists.length > 0) {
        throw new Error('Vendor already registered!')
      }

      return await this.vendors.create(dataVendor)
    } catch (error) {
      throw new Error(error)
    }
  }

  async getAll (pharmacyId) {
    try {
      const vendor = await this.vendors.findAll({
        where: { pharmacy_id: pharmacyId }
      })

      if (!vendor) {
        throw new Error('There is no vendor!')
      }

      return vendor
    } catch (error) {
      throw new Error(error)
    }
  }

  async getById (vendorId, pharmacyId) {
    try {
      const vendor = await this.vendors.findAll({
        where: { id: vendorId, pharmacy_id: pharmacyId }
      })

      if (!vendor) {
        throw new Error('Vendor does not exists!')
      }

      return vendor
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteById (vendorId, pharmacyId) {
    try {
      const vendor = await this.getById(vendorId, pharmacyId)

      if (!vendor) {
        throw new Error('Vendor does not Exists')
      }

      return await this.vendors.destroy({ where: { id: vendorId } })
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = { VendorsServices }
