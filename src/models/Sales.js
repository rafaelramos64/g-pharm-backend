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
      },
      id_vendor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
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
    this.belongsTo(models.Users, {
      foreignKey: 'id_vendor',
      as: 'vendor_sale'
    })
    this.belongsToMany(models.Medicines, {
      foreignKey: 'id_medicines',
      as: 'medicines_sale',
      through: ''
    })
  }
}

module.exports = { Sales }
