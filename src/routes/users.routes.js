const { Router } = require('express')
const UsersController = require('../controllers/UsersController')

const router = Router()

router.post('/users', UsersController.save)
router.delete('/users/:id', UsersController.deleteUser)

module.exports = router
