const express = require('express')
const cors = require('cors')
const { routes } = require('./routes/routes')
require('./database')

const app = express()

app.use(express.json())

app.use(cors())

// Config dotenv
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

app.use(routes)

module.exports = { app }
