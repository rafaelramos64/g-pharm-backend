const { Model, DataTypes } = require('sequelize')

class SalesMedicines extends Model {
  static init (sequelize) {
    super.init({
      medicine_id: {
        type: DataTypes.INTEGER
      },
      sale_id: {
        type: DataTypes.INTEGER
      },
      amount: {
        type: DataTypes.INTEGER
      },
      value_unit: {
        type: DataTypes.FLOAT
      }
    }, {
      sequelize,
      modelName: 'Sales_Medicines',
      tableName: 'sales_medicines'
    })
  }
}

module.exports = { SalesMedicines }
