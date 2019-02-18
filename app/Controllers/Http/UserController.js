'use strict'

const User = use('App/Models/User')

class UserController {
  // Function for get user profile (Authenticated)
  async profile({ auth }) {
    try {
      const user = await auth.getUser()
      console.log(user)
      return {
        status: 'success',
        data: user
      }
    } catch (error) {
      return error
    }
  }

  // Function for login with authentication using jwt
  async login({ request, auth }) {
    const { email, password } = request.all()

    try {
      const token = await auth.attempt(email, password)
      return token
    } catch (error) {
      return error
    }
  }

  // Function for register new user
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
