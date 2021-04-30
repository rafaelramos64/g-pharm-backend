class MedicinesSales {
  constructor (Medicines) {
    this.medicines = Medicines
  }

  async create (name, price, purchase_date, due_date, stock) {
    const dataMedicine = {
      name,
      price,
      purchase_date,
      due_date,
      stock
    }

    try {
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
        throw new Error('Medicines does not exists')
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
        throw new Error('Id not exists')
      }

      return medicine
    } catch (error) {
      throw new Error(error)
    }
  }

  async changeById (id, data = {}) {
    try {
      const medicine = await this.medicines.update(data, {
        where: { id }
      })

      return medicine
    } catch (error) {
      throw new Error(error)
    }
  }

  async delete (id) {
    try {
      const medicine = await this.medicines.destroy({
        where: { id }
      })

      return medicine
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = { MedicinesSales }
