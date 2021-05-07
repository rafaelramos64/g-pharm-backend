class SalesServices {
  constructor (Sales) {
    this.sales = Sales
  }

  async create (salePrice, saleDate, medicines = [], vendorId, pharmacyId) {
    try {
      const dataSale = {
        sale_price: salePrice,
        sale_date: saleDate,
        vendor_id: vendorId,
        pharmacy_id: pharmacyId
      }
      const sale = await this.sales.create(dataSale)

      console.log(medicines[0])

      for (const index in medicines) {
        await sale.addMedicine(sale.id,
          {
            through: {
              medicine_id: medicines[index].id,
              value_unit: medicines[index].price,
              amount: medicines[index].amount
            }
          }
        )
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
