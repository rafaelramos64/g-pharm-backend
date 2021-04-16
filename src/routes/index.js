const { Router } = require('express')
const usersRoutes = require('./users.routes.js')

const router = Router()

router.get('/', function (req, res) {
  res.status(200).send('<h1 style="text-align: center">App Online!</h1>')
})

router.use(usersRoutes)

module.exports = router
