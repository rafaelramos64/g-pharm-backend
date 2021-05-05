class MedicinesServices {
  constructor (Medicines) {
    this.medicines = Medicines
  }

  async create (name, price, purchaseDate, dueDate, stock, pharmacyId) {
    try {
      const dataMedicine = {
        name,
        price,
        purchase_date: new Date(purchaseDate),
        due_date: new Date(dueDate),
        stock,
        pharmacy_id: pharmacyId
      }

      const medicine = await this.medicines.create(dataMedicine)

      return medicine
    } catch (error) {
      throw new Error(error)
    }
  }

  async getAll (pharmacyId) {
    try {
      const medicines = await this.medicines.findAll({
        where: { pharmacy_id: pharmacyId }
      })

      if (!medicines) {
        throw new Error('There is no medicine!')
      }

      return medicines
    } catch (error) {
      throw new Error(error)
    }
  }

  async getByName (name, pharmacyId) {
    try {
      const medicines = await this.medicines.findAll({
        where: { name, pharmacy_id: pharmacyId }
      })

      if (!medicines) {
        throw new Error('Medicines name does not exists')
      }

      return medicines
    } catch (error) {
      throw new Error(error)
    }
  }

  async getById (medicineId, pharmacyId) {
    try {
      const medicine = await this.medicines.findAll({
        where: { id: medicineId, pharmacy_id: pharmacyId }
      })

      if (!medicine) {
        throw new Error('Medicine does not exists!')
      }

      return medicine
    } catch (error) {
      throw new Error(error)
    }
  }

  async changeById (medicineId, pharmacyId, data = {}) {
    try {
      const medicine = await this.getById(medicineId, pharmacyId)

      if (!medicine) {
        throw new Error('Medicine does not exists!')
      }
      return await this.medicines.update(data, {
        where: { id: medicineId, pharmacy_id: pharmacyId }
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteById (medicineId, pharmacyId) {
    try {
      const medicine = await this.getById(medicineId, pharmacyId)

      if (!medicine) {
        throw new Error('Medicine does not Exists!')
      }

      return await this.medicines.destroy({
        where: { id: medicineId, pharmacy_id: pharmacyId }
      })
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = { MedicinesServices }
