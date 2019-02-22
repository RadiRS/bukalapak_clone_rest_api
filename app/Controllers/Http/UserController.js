'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class UserController {
  // Function for get user profile (Authenticated)
  async profile({ auth }) {
    try {
      return await auth.getUser()
    } catch (error) {
      response.send('Credentials missing')
    }
  }

  // Function for login with authentication using jwt
  async login({ request, auth }) {
    const { email, password } = request.all()

    try {
      const data_token = await auth.attempt(email, password)

      return {
        email,
        token: data_token.token
      }
    } catch (error) {
      return {
        error: `${error.uidField || error.passwordField} salah`
        // error: error
      }
    }
  }

  // Function for register new user
  async register({ request, auth }) {
    const { email, password, username } = request.post()
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

    if (validation.fails()) {
      const error = validation._errorMessages[0].message
      return {
        status: 'Gagal Registrasi',
        error
      }
    }

    try {
      await User.create({
        username,
        email,
        password
      })
      const data_token = await auth.attempt(email, username)
      return {
        token: data_token.token
      }
    } catch (error) {
      return error
    }
  }
}

module.exports = UserController
