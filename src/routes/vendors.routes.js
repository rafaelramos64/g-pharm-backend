const { Router } = require('express')
const VendorsController = require('../controllers/VendorsController')

const router = Router()

router.post('/vendors', VendorsController.save)
router.delete('/vendors/:id', VendorsController.deleteUser)

module.exports = router
