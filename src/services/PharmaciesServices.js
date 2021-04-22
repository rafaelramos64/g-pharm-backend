class PharmaciesServices {
  constructor (Pharmacy) {
    this.Pharmacy = Pharmacy
  }

  async create (name, description, id_admin = null) {
    const dataPharmacy = { name, description, id_admin }
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
        attributes: ['id', 'name', 'description', 'id_admin']
      })
    } catch (error) {
      console.error('at PharmaciesServices', error)
    }
  }
}

module.exports = { PharmaciesServices }
