class SalesServices {
  constructor (Sale) {
    this.Sale = Sale
  }

  async create (salePrice, saleDate, idMedicines, idVendor) {
    const dataSale = {
      sale_price: salePrice,
      sale_date: saleDate,
      id_medicines: idMedicines,
      id_vendor: idVendor
    }
    try {
      return await this.Sale.create(dataSale)
    } catch (error) {
      console.error('at SalesServices', error)
      throw new Error(error)
    }
  }

  async getAll () {
    try {
      return await this.Sale.findAll({
        attributes: ['sale_price', 'sale_date', 'id_medicines', 'id_vendor']
      })
    } catch (error) {
      console.error('at SalesServices', error)
    }
  }
}

module.exports = { SalesServices }
