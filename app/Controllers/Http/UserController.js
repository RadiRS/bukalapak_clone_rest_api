'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class UserController {
  // Function for get user profile (Authenticated)
  async profile({ auth }) {
    try {
      const user = await auth.getUser()
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
      const data_token = await auth.attempt(email, password)
      return {
        user: { email, password },
        data_token
      }
    } catch (error) {
      return {
        error: error.message
      }
    }
  }

  // Function for register new user
  async register({ request }) {
    const { email, password } = request.all()
    const rules = {
      username: 'required',
      email: 'required|email|unique:users',
      password: 'required',
      password_confirmation: 'required_if:password|same:password'
    }

    const messages = {
      'username.required': 'Username tidak boleh kosong',
      'email.ruquired': 'Email tidak boleh kosong',
      'email.email': 'Email tidak valid',
      'email.unique': 'Email telah terdaftar',
      'password.ruquired': 'Password tidak boleh kosong',
      'password_confirmation.ruquired_if':
        'Konfirmasi password tidak boleh kosong',
      'password_confirmation.same': 'Konfirmasi password tidak sama'
    }

    const validation = await validate(request.all(), rules, messages)
    const error = validation._errorMessages[0].message

    if (validation.fails()) {
      return {
        status: 'Gagal Registrasi',
        error
      }
    }

    try {
      await User.create({
        email,
        password,
        username
      })
      return this.login(...arguments)
    } catch (error) {
      return error
    }
  }
}

module.exports = UserController
