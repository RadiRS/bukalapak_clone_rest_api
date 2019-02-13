'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// ROuter Grouped Product
Route.group(() => {
  Route.get('products', 'ProductController.index')
  Route.get('products/:id', 'ProductController.show')
  Route.delete('products/:id', 'ProductController.delete')
  Route.patch('products/:id', 'ProductController.update')
  Route.post('products', 'ProductController.store')
}).prefix('api/v1')

// ROuter Grouped Order
Route.group(() => {
  Route.get('orders', 'OrderController.index')
  Route.get('orders/:id', 'OrderController.show')
  Route.delete('orders/:id', 'OrderController.delete')
  Route.patch('orders/:id', 'OrderController.update')
  Route.post('order', 'OrderController.store')
}).prefix('api/v1')
