class SalesServices {
  constructor (Sales) {
    this.sales = Sales
  }

  async create (salePrice, saleDate, medicinesId, vendorId, pharmacyId) {
    try {
      const dataSale = {
        sale_price: salePrice,
        sale_date: saleDate,
        medicines_id: medicinesId,
        vendor_id: vendorId,
        pharmacy_id: pharmacyId
      }
      return await this.sales.create(dataSale)
    } catch (error) {
      throw new Error(error)
    }
  }

  async getAll (pharmacyId) {
    try {
      const sales = await this.sales.findAll({
        where: { pharmacy_id: pharmacyId }
      })

      if (!sales) {
        throw new Error('There is no sale!')
      }

      return sales
    } catch (error) {
      throw new Error(error)
    }
  }

  async getById (id) {
    try {
      const sale = await this.sales.findByPk(id)

      if (!sale) {
        throw new Error('Sale does not exists!')
      }

      return sale
    } catch (error) {
      throw new Error(error)
    }
  }

  async getByDate (saleDate) {
    try {
      const sale = await this.sale.findAll({
        where: { sale_date: saleDate }
      })

      if (!sale) {
        throw new Error('Sale does not exists!')
      }

      return sale
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteById (id) {
    try {
      const sale = await this.getById(id)

      if (!sale) {
        throw new Error('Sale does not exists!')
      }

      return await this.sale.destroy(id)
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = { SalesServices }
