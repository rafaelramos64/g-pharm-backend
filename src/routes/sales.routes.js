const { Router } = require('express')
const salesController = require('../controllers/SalesController')

const routes = Router()

routes.post('/sales/:pharmacyId/:vendorId', salesController.create)
routes.get('/sales/:pharmacyId', salesController.getAll)
routes.get('/sales/:pharmacyId/:saleId/', salesController.getById)
routes.get('/sales/:pharmacyId/date', salesController.getByDate)
routes.delete('/sales/:pharmacyId/:saleId', salesController.deleteById)

module.exports = routes
