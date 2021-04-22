class UsersServices {
  constructor (User) {
    this.User = User
  }

  async create (name, email) {
    const dataUser = { name, email }
    try {
      return await this.User.create(dataUser)
    } catch (error) {
      console.error('at UsersServices', error)
      throw new Error(error)
    }
  }

  async getAll () {
    try {
      return await this.User.findAll({
        attributes: ['id', 'name', 'email']
      })
    } catch (error) {
      console.error('at UsersServices', error)
    }
  }

  async delete (id) {
    try {
      return await this.User.destroy({ where: { id } })
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }
}
module.exports = { UsersServices }
