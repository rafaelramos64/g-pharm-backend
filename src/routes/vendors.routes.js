const { Router } = require('express')
const VendorsController = require('../controllers/VendorsController')

const router = Router()

router.post('/vendors/:pharmacyId', VendorsController.save)
router.get('/vendors/:pharmacyId', VendorsController.getAll)
router.get('/vendors/:pharmacyId/:vendorId', VendorsController.getById)
router.delete('/vendors/:pharmacyId/:vendorId', VendorsController.deleteById)

module.exports = router
