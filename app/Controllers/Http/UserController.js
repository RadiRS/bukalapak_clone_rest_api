'use strict'

const User = use('App/Models/User')

class UserController {
  index() {}

  async login({ request, auth }) {
    const { email, password } = request.all()

    try {
      const token = await auth.attempt(email, password)
      return token
    } catch (error) {
      return error
    }
  }

  async register({ request }) {
    const { email, password } = request.all()

    try {
      await User.create({
        email,
        password,
        username: email
      })
      return this.login(...arguments)
    } catch (error) {
      return error
    }
  }
}

module.exports = UserController
