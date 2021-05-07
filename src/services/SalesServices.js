class SalesServices {
  constructor (Sales, Medicines) {
    this.sales = Sales
    this.medicines = Medicines
  }

  async create (salePrice, saleDate, medicines = [], vendorId, pharmacyId) {
    try {
      const dataSale = {
        sale_price: salePrice,
        sale_date: saleDate,
        vendor_id: vendorId,
        pharmacy_id: pharmacyId
      }
      const medicine = await this.medicines.findByPk(1)

      const [sale] = await this.sales.findOrCreate({
        where: dataSale
      })

      console.log(medicine)

      for (const index in medicines) {
        await sale.addMedicine(medicine)
      }

      return sale
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

  async getById (saleId, pharmacyId) {
    try {
      const sale = await this.sales.findAll({
        where: { id: saleId, pharmacy_id: pharmacyId }
      })

      if (!sale) {
        throw new Error('Sale does not exists!')
      }

      return sale
    } catch (error) {
      throw new Error(error)
    }
  }

  async getByDate (saleDate, pharmacyId) {
    try {
      const sale = await this.sale.findAll({
        where: { sale_date: saleDate, pharmacy_id: pharmacyId }
      })

      if (!sale) {
        throw new Error('Sale does not exists!')
      }

      return sale
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteById (saleId, pharmacyId) {
    try {
      const sale = await this.getById(saleId, pharmacyId)

      if (!sale) {
        throw new Error('Sale does not exists!')
      }

      return await this.sale.destroy(saleId)
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = { SalesServices }
