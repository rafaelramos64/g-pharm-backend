const { Router } = require('express')
const VendorsController = require('../controllers/VendorsController')

const router = Router()

router.post('/:pharmacy_id/vendors', VendorsController.save)
router.delete('/vendors/:id', VendorsController.deleteById)

module.exports = router
