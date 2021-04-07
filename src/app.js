const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors())
// Routes
require('./routes')(app)

module.exports = { app }
