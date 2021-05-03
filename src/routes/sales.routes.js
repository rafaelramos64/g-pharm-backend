const { Router } = require('express')
const salesController = require('../controllers/SalesController')

const routes = Router()

routes.post('/sales/:pharmacyId', salesController.create)
routes.get('/sales/:pharmacyId', salesController.getAll)

module.exports = routes
