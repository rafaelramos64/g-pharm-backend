module.exports = app => {
  const url = '/api'

  app.use(`${url}/users`, require('./controllers/users'))

  // Route invalid
  app.route('*').get((request, response) => {
    response.status(404).json({ message: 'Route does not exists!', route: request.url })
  })
}
