const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

// Models
const { Users, Pharmacies, Sales, Medicines } = require('../models')

const connection = new Sequelize(dbConfig)

// Connections Models
Users.init(connection)
Pharmacies.init(connection)
Sales.init(connection)
Medicines.init(connection)

Sales.associate(connection.models)

module.exports = connection
