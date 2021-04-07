const { Sequelize, DataTypes, Model } = require('sequelize')
const dbConfig = require('../config/database')
const sequelize = new Sequelize(dbConfig)

class Users extends Model { }

Users.init({
  id: {
    type: DataTypes.STRING,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.TIME,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.TIME,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Users',
  tableName: 'users',
  timestamps: true,
  createdAt: true,
  updatedAt: 'updateTimestamp'
})

module.exports = { Users }
