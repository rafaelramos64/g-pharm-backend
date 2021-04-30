class SalesServices {
  constructor (Sales) {
    this.sales = Sales
  }

  async create (salePrice, saleDate, idMedicines, idVendor) {
    const dataSale = {
      sale_price: salePrice,
      sale_date: saleDate,
      id_medicines: idMedicines,
      id_vendor: idVendor
    }
    try {
      return await this.sales.create(dataSale)
    } catch (error) {
      // console.error('at SalesServices', error)
      throw new Error(error)
    }
  }

  async getAll () {
    try {
      return await this.sales.findAll({
        attributes: ['sale_price', 'sale_date', 'id_medicines', 'id_vendor']
      })
    } catch (error) {
      // console.error('at SalesServices', error)
      throw new Error(error)
    }
  }
}

module.exports = { SalesServices }
