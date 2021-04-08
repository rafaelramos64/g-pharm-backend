const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

// Models
const { Users } = require('../models/Users')

const connection = new Sequelize(dbConfig)

// Connections Models
Users.init(connection)

module.exports = connection
