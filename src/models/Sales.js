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

    this.hasOne(models.Pharmacies, {
      foreignKey: 'pharmacy_id',
      as: 'sale_pharmacy'
    })

    this.belongsToMany(models.Medicines, {
      foreignKey: 'medicines_id',
      through: 'sales_medicines',
      as: 'medicines'
    })
  }
}

module.exports = { Sales }
