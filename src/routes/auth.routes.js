const { Router } = require('express')
const authController = require('../controllers/AuthController')

const routes = Router()

routes.post('/vendors/auth', authController.loginVendor)
routes.post('/pharmacies/auth', authController.loginPharmacy)

module.exports = routes
