const { Router } = require('express')

// Controllers
const UsersController = require('./controllers/UsersController')

const routes = Router()

// Routes Users
routes.post('/users', UsersController.save)
routes.delete('/users/:id', UsersController.deleteUser)

module.exports = { routes }
