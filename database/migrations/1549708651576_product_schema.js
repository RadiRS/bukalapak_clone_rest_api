'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductSchema extends Schema {
  up() {
    this.create('products', table => {
      table.increments();
      table
        .string('name', 125)
        .notNullable()
        .unique();
      table
        .text('description', 254)
        .notNullable()
        .unique();
      table.integer('qty').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('products');
  }
}

module.exports = ProductSchema;
