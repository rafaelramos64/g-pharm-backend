const { Router } = require('express')
const medicinesController = require('../controllers/MedicinesController')

const routes = Router()

routes.post('/medicines/:pharmacyId', medicinesController.create)
routes.get('/medicines/:pharmacyId', medicinesController.getAll)
routes.get('/medicines/:pharmacyId/pername', medicinesController.getByName)
routes.get('/medicines/:pharmacyId/:medicineId/perid', medicinesController.getById)
routes.put('/medicines/:pharmacyId/:medicineId', medicinesController.changeById)
routes.delete('medicines/:pharmacyId/:medicineId', medicinesController.deleteById)

module.exports = routes
