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
      id_admin: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    }, {
      sequelize,
      modelName: 'Pharmacies',
      tableName: 'pharmacies'
    })
  }
}

module.exports = { Pharmacies }
