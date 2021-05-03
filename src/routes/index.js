const { Router } = require('express')
const authRoutes = require('./auth.routes')
const pharmaciesRoutes = require('./pharmacies.routes')
const medicinesRoutes = require('./medicines.routes')
const salesRoutes = require('./sales.routes')
const vendorsRoutes = require('./vendors.routes.js')

const router = Router()

router.get('/', function (req, res) {
  res.status(200).send('<h1 style="text-align: center">App Online!</h1>')
})

router.use(authRoutes)
router.use(pharmaciesRoutes)
router.use(medicinesRoutes)
router.use(salesRoutes)
router.use(vendorsRoutes)

module.exports = router
