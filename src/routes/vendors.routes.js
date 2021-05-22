const { Router } = require('express')
const VendorsController = require('../controllers/VendorsController')

const router = Router()

router.post('/vendors', VendorsController.save)
router.get('/vendors', VendorsController.getAll)
router.get('/vendors/:vendorId', VendorsController.getById)
router.delete('/vendors/:vendorId', VendorsController.deleteById)

module.exports = router
