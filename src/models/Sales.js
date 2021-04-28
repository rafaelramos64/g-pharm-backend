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
      },
      id_medicines: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'medicines',
          key: 'id'
        }
      }
    }, {
      sequelize,
      modelName: 'Sales',
      tableName: 'sales'
    })
  }

  static associate (models) {
    this.hasOne(models.Vendors, {
      foreignKey: 'vendor_id',
      as: 'sale_vendor'
    })

    this.belongsToMany(models.Medicines, {
      foreignKey: 'medicines_id',
      through: 'sales_medicines',
      as: 'medicines'
    })
  }
}

module.exports = { Sales }
