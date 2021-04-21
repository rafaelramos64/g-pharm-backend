const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

// Models
const { Users, Pharmacies } = require('../models')

const connection = new Sequelize(dbConfig)

// Connections Models
Users.init(connection)
Pharmacies.init(connection)

module.exports = connection
