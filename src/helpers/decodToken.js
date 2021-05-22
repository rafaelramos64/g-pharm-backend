const jwt = require('jsonwebtoken')
const authConfig = require('../config/authentication.json')

const decod = (token) => {
  jwt.verify(token, authConfig.secret, (error, decoded) => {
    if (error) return response.status(401).json({ error: 'Token invalid' })

    request.userId = decoded.id
    return next()
  })
}