const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

// Models
const { Vendors, Pharmacies, Sales, Medicines, SalesMedicines } = require('../models')

const connection = new Sequelize(dbConfig)

// Connections Models
Vendors.init(connection)
Pharmacies.init(connection)
Sales.init(connection)
Medicines.init(connection)
SalesMedicines.init(connection)

// Associations Models
Medicines.associate(connection.models)
Sales.associate(connection.models)
Pharmacies.associate(connection.models)
Vendors.associate(connection.models)

module.exports = connection
