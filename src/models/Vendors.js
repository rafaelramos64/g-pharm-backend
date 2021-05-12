const { DataTypes, Model } = require('sequelize')

class Vendors extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Vendors',
      tableName: 'vendors'
    })
  }

  static associate (models) {
    this.belongsTo(models.Pharmacies, {
      foreignKey: 'pharmacy_id',
      as: 'vendor_pharmacy'
    })
  }
}

module.exports = { Vendors }
