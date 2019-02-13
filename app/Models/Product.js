'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Order = use('App/Models/Order')

class Product extends Model {
  orders() {
    // return this.hasOne(Order)
  }

  getAllData() {
    return Product.all()
  }
}

module.exports = Product
