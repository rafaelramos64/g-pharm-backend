class MedicinesServices {
  constructor (Medicines) {
    this.medicines = Medicines
  }

  async create (name, price, purchaseDate, dueDate, stock) {
    try {
      const dataMedicine = {
        name,
        price,
        purchase_date: purchaseDate,
        due_date: dueDate,
        stock
      }

      const medicine = await this.medicines.create(dataMedicine)
      return medicine
    } catch (error) {
      throw new Error(error)
    }
  }

  async getAll () {
    try {
      const medicines = await this.medicines.findAll({
        attributes: ['id', 'name', 'price', 'purchase_date', 'due_date', 'stock']
      })

      if (!medicines) {
        throw new Error('There is no medicine!')
      }

      return medicines
    } catch (error) {
      throw new Error(error)
    }
  }

  async getByName (name) {
    try {
      const medicines = await this.medicines.findAll({
        where: { name }
      })

      if (!medicines) {
        throw new Error('Medicines name does not exists')
      }

      return medicines
    } catch (error) {
      throw new Error(error)
    }
  }

  async getById (id) {
    try {
      const medicine = await this.medicines.findByPk(id)

      if (!medicine) {
        throw new Error('Medicine does not exists!')
      }

      return medicine
    } catch (error) {
      throw new Error(error)
    }
  }

  async changeById (id, data = {}) {
    try {
      const medicine = await this.getById(id)

      if (!medicine) {
        throw new Error('Medicine does not exists!')
      }
      return await this.medicines.update(data, {
        where: { id }
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteById (id) {
    try {
      const medicine = await this.getById(id)

      if (!medicine) {
        throw new Error('Medicine does not Exists!')
      }

      return await this.medicines.destroy({
        where: { id }
      })
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = { MedicinesServices }
