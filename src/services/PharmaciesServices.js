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
}

module.exports = { PharmaciesServices }
