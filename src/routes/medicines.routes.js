const { Router } = require('express')
const medicinesController = require('../controllers/MedicinesController')

const routes = Router()

routes.post('/medicines/:pharmacyId', medicinesController.create)
routes.get('/medicines/:pharmacyId', medicinesController.getAll)
routes.get('/medicines/pername/:pharmacyId', medicinesController.getByName)
routes.get('/medicines/perid/:medicineId/:pharmacyId', medicinesController.getById)
routes.put('/medicines/:medicineId/:pharmacyId', medicinesController.changeById)
routes.delete('medicines/delete/:medicineId/:pharmacyId', medicinesController.deleteById)

module.exports = routes
