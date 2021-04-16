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
      return error
    }
  }

  async delete (id) {
    let user

    try {
      user = await this.User.findAll({ where: { id } })
    } catch (error) {
      console.log(error)
      return error
    }

    if (user.length > 0) {
      this.User.destroy({ where: { id } })
      return { message: 'User deleted!' }
    } else {
      return { error: 'Id not exists!' }
    }
  }
}
module.exports = { UsersServices }
