const { DataTypes, Model } = require('sequelize')

class Users extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Users',
      tableName: 'users'
    })
  }
}

module.exports = { Users }
