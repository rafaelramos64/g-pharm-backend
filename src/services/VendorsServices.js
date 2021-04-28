class VendorsServices {
  constructor (Vendor) {
    this.Vendor = Vendor
  }

  async create (name, email, password) {
    const dataVendor = { name, email, password }
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
        attributes: ['id', 'name', 'email']
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
