const { Model, DataTypes } = require('sequelize')

class Medicines extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      purchase_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Medicines',
      tableName: 'medicines'
    })
  }

  static associate (models) {
    this.belongsTo(models.Pharmacies, {
      foreignKey: 'pharmacy_id',
      as: 'medicine_pharmacy'
    })

    this.belongsToMany(models.Sales, {
      through: 'sales_medicines',
      foreignKey: 'medicine_id',
      as: 'sales'
    })
  }
}

module.exports = { Medicines }
