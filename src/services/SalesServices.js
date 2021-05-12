class SalesServices {
  constructor (Sales, Medicines, SalesMedicines, Vendors) {
    this.sales = Sales
    this.medicines = Medicines
    this.salesMedicines = SalesMedicines
    this.vendors = Vendors
  }

  async create (salePrice, saleDate, medicines = [], vendorId, pharmacyId) {
    try {
      const dataSale = {
        sale_price: salePrice,
        sale_date: new Date(saleDate),
        vendor_id: vendorId,
        pharmacy_id: pharmacyId
      }

      for (const index in medicines) {
        const medicine = await this.medicines.findByPk(medicines[index].id)
        if (!medicine) {
          throw new Error(`Medicine with id: ${medicines[index].id}, does not exists!`)
        }
      }

      const [sale] = await this.sales.findOrCreate({
        where: dataSale,
        include: [{
          model: this.medicines,
          as: 'medicines',
          attributes: ['id', 'name', 'price', 'stock', 'purchase_date', 'due_date']
        }, {
          model: this.vendors,
          as: 'sale_vendor',
          attributes: ['id', 'name', 'email']
        }]
      })

      const dataSalesMedicines = []
      for (const index in medicines) {
        dataSalesMedicines.push({
          medicine_id: medicines[index].id,
          sale_id: sale.id,
          amount: medicines[index].amount,
          value_unit: medicines[index].valueUnit
        })
      }

      for (const index in dataSalesMedicines) {
        await this.salesMedicines.create(dataSalesMedicines[index])
      }

      return sale
    } catch (error) {
      throw new Error(error)
    }
  }

  async getAll (pharmacyId) {
    try {
      const sales = await this.sales.findAll({
        where: { pharmacy_id: pharmacyId },
        include: [{
          model: this.medicines,
          as: 'medicines',
          attributes: ['id', 'name', 'price', 'stock', 'purchase_date', 'due_date']
        }, {
          model: this.vendors,
          as: 'sale_vendor',
          attributes: ['id', 'name', 'email']
        }]
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
        where: { id: saleId, pharmacy_id: pharmacyId },
        include: [{
          model: this.medicines,
          as: 'medicines',
          attributes: ['id', 'name', 'price', 'stock', 'purchase_date', 'due_date']
        }, {
          model: this.vendors,
          as: 'sale_vendor',
          attributes: ['id', 'name', 'email']
        }]
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
      const sale = await this.sales.findAll({
        where: { sale_date: saleDate, pharmacy_id: pharmacyId },
        include: [{
          model: this.medicines,
          as: 'medicines',
          attributes: ['id', 'name', 'price', 'stock', 'purchase_date', 'due_date']
        }, {
          model: this.vendors,
          as: 'sale_vendor',
          attributes: ['id', 'name', 'email']
        }]
      })

      if (!sale) {
        throw new Error('Sale does not exists!')
      }

      return sale
    } catch (error) {
      throw new Error(error)
    }
  }

  async cancelById (saleId, pharmacyId) {
    try {
      const sale = await this.getById(saleId, pharmacyId)

      if (!sale) {
        throw new Error('Sale does not exists!')
      }

      sale.canceled = true
      return await this.sales.update(sale, { where: { id: saleId, canceled: false } })
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = { SalesServices }
