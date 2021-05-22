const { Router } = require('express')
const salesController = require('../controllers/SalesController')

const routes = Router()

routes.post('/sales/:vendorId', salesController.create)
routes.get('/sales', salesController.getAll)
routes.get('/sales/:saleId', salesController.getById)
routes.get('/sales/date', salesController.getByDate)
routes.put('/sales/:saleId', salesController.cancelById)

module.exports = routes
