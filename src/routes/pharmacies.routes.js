const { Router } = require('express')
const pharmaciesController = require('../controllers/PharmaciesController')

const router = Router()

router.post('/pharmacies', pharmaciesController.save)

module.exports = router
