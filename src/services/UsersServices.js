class UsersServices {
  constructor (User) {
    this.User = User
  }

  async create (name, email) {
    const dataUser = { name, email }
    try {
      return await this.User.create(dataUser)
    } catch (error) {
      console.error(error)
      throw new Error(error)
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
