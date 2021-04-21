const { Router } = require('express')
const usersRoutes = require('./users.routes.js')
const pharmaciesRoutes = require('./pharmacies.routes')

const router = Router()

router.get('/', function (req, res) {
  res.status(200).send('<h1 style="text-align: center">App Online!</h1>')
})

router.use(usersRoutes)
router.use(pharmaciesRoutes)

module.exports = router
