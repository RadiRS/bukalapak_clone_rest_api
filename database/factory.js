'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

// Factory blueprint for user
Factory.blueprint('App/Models/User', async faker => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: await Hash.make(faker.password())
  }
})

// Factory blueprint for product
Factory.blueprint('App/Models/Product', async faker => {
  return {
    name: faker.sentence({ words: 5 }),
    image: faker.avatar(),
    shop: faker.word({ words: 2 }),
    price: faker.integer({ min: 1, max: 10000000 }),
    description: faker.paragraph()
  }
})
