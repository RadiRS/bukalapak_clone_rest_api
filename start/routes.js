'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// Router Grouped Product
Route.group(() => {
  Route.get('products', 'ProductController.index')
  Route.get('product/:id', 'ProductController.show')
  Route.delete('products/:id', 'ProductController.delete')
  Route.patch('products/:id', 'ProductController.update')
  Route.post('products', 'ProductController.store')
}).prefix('api/v1')

// Router Grouped Order
Route.group(() => {
  Route.get('orders', 'OrderController.index')
  Route.get('order/:id', 'OrderController.show')
  Route.delete('order/:id', 'OrderController.delete')
  Route.patch('order/:id', 'OrderController.update')
  Route.post('order', 'OrderController.store')
}).prefix('api/v1')

// Router Grouped User & Auth
Route.group(() => {
  Route.get('user/profile', 'UserController.profile').middleware('auth')

  Route.post('auth/login', 'UserController.login')
  Route.post('auth/register', 'UserController.register')
}).prefix('api/v1')
