const { Router } = require('express')
const { TestController } = require('./controllers/TestController')

const router = Router()

const testController = new TestController()

router.get('/', (request, response) => {
  const data = testController.show()
  response.status(200).json(data)
})

module.exports = router
