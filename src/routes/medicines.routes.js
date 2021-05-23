const { Router } = require('express')
const medicinesController = require('../controllers/MedicinesController')

const routes = Router()

routes.post('/medicines', medicinesController.create)
routes.get('/medicines', medicinesController.getAll)
routes.get('/medicines/pername', medicinesController.getByName)
routes.get('/medicines/:medicineId/perid', medicinesController.getById)
routes.put('/medicines/:medicineId', medicinesController.changeById)
routes.delete('/medicines/:medicineId', medicinesController.deleteById)

module.exports = routes
