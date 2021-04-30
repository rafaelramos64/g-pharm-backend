class VendorsServices {
  constructor (Vendor, Pharmacy) {
    this.Vendor = Vendor
    this.Pharmacy = Pharmacy
  }

  async create (name, email, password, pharmacyId) {
    const dataVendor = { name, email, password, pharmacy_id: pharmacyId }

    try {
      const pharmacy = await this.Pharmacy.findByPk(pharmacyId)

      if (!pharmacy) {
        throw new Error('Pharmacy does not exists!')
      }
    } catch (error) {
      throw new Error(error.message)
    }

    try {
      return await this.Vendor.create(dataVendor)
    } catch (error) {
      // console.error('at VendorsServices', error)
      throw new Error(error)
    }
  }

  async getAll () {
    try {
      return await this.Vendor.findAll({
        attributes: ['id', 'name', 'email', 'pharmacy_id']
      })
    } catch (error) {
      console.error('at VendorsServices', error)
    }
  }

  async delete (id) {
    try {
      return await this.Vendor.destroy({ where: { id } })
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }
}
module.exports = { VendorsServices }
