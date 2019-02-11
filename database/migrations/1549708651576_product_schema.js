'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up() {
    this.create('products', table => {
      table.increments()
      table.string('name', 125).notNullable()
      table.string('image', 125).notNullable()
      table.string('shop', 125).notNullable()
      table.float('price').notNullable()
      table.text('description', 254)
      table.timestamps()
    })
  }

  down() {
    this.drop('products')
  }
}

module.exports = ProductSchema
