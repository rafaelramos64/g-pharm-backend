class PharmaciesServices {
  constructor (Pharmacy) {
    this.Pharmacy = Pharmacy
  }

  async create (name, description, password) {
    const dataPharmacy = { name, description, password }

    try {
      return await this.Pharmacy.create(dataPharmacy)
    } catch (error) {
      console.error('at PharmaciesServices', error)
      throw new Error(error)
    }
  }

  async getAll () {
    try {
      return await this.Pharmacy.findAll({
        attributes: ['id', 'name', 'description']
      })
    } catch (error) {
      console.error('at PharmaciesServices', error)
    }
  }
}

module.exports = { PharmaciesServices }
