const { Router } = require('express')

const router = Router()

const Handelrs = {
  create: require('./handlers/create')
}

router.post('/', Handelrs.create)

module.exports = { router }
