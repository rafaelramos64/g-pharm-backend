const { Router } = require('express')
const MedicinesController = require('../controllers/MedicinesController')

const routes = Router()

routes.post('/medicines/:pharmacyId', MedicinesController.create)
routes.get('/medicines/:pharmacyId', MedicinesController.getAll)
routes.get('/medicines/pername/:pharmacyId', MedicinesController.getByName)
routes.get('/medicines/perid/:medicineId/:pharmacyId', MedicinesController.getById)
routes.put('/medicines/:medicineId/:pharmacyId', MedicinesController.changeById)
routes.delete('medicines/delete/:medicineId/:pharmacyId', MedicinesController.deleteById)

module.exports = routes
