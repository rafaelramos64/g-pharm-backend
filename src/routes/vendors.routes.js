const { Router } = require('express')
const VendorsController = require('../controllers/VendorsController')

const router = Router()

router.post('/users', VendorsController.save)
router.delete('/users/:id', VendorsController.deleteUser)

module.exports = router
