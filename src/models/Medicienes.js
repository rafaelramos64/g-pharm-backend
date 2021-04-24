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
      id_admin: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    }, {
      sequelize,
      modelName: 'Medicines',
      tableName: 'medicines'
    })
  }
}

module.exports = { Medicines }
