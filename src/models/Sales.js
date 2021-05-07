const { Model, DataTypes } = require('sequelize')

class Sales extends Model {
  static init (sequelize) {
    super.init({
      sale_price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      sale_date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Sales',
      tableName: 'sales'
    })
  }

  static associate (models) {
    this.belongsTo(models.Vendors, {
      foreignKey: 'vendor_id',
      as: 'sale_vendor'
    })

    this.belongsTo(models.Pharmacies, {
      foreignKey: 'pharmacy_id',
      as: 'sale_pharmacy'
    })

    this.belongsToMany(models.Medicines, {
      through: 'sales_medicines',
      foreignKey: 'medicine_id',
      as: 'medicines'
    })
  }
}

module.exports = { Sales }
