class VendorsServices {
  constructor (Vendor) {
    this.Vendor = Vendor
  }

  async create (name, email, password, pharmacyId) {
    const dataVendor = { name, email, password, pharmacy_id: pharmacyId }
    try {
      return await this.Vendor.create(dataVendor)
    } catch (error) {
      console.error('at VendorsServices', error)
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
