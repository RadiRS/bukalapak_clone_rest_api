'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up() {
    this.create('orders', table => {
      table.increments()
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
      table.integer('qty').notNullable()
      table.float('price').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('orders')
  }
}

module.exports = OrderSchema
