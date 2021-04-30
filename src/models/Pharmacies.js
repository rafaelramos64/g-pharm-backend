const { Model, DataTypes } = require('sequelize')

class Pharmacies extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Pharmacies',
      tableName: 'pharmacies'
    })
  }

  static associate (models) {
    this.hasMany(models.Vendors, {
      foreignKey: 'pharmacy_id',
      as: 'parmacie_vendors'
    })
  }
}

module.exports = { Pharmacies }
