const { Router } = require('express')
const PharmaciesController = require('../controllers/PharmaciesController')

const router = Router()

router.post('/pharmacies', PharmaciesController.save)

module.exports = router
