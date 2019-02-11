'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Product = use('App/Models/Product')

class Order extends Model {
  products() {
    return this.belongsTo(Product)
  }
}

module.exports = Order
