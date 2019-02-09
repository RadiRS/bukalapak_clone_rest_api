'use strict'

const Product = use('App/Models/Product')

class ProductController {
  // Function for get all data from products
  async index() {
    const products = await Product.all()
    return products
  }

  // Function for post data product
  async store({ request }) {
    const product = await Product.create(request.all())
    return {
      status: 'Success',
      product
    }
  }
}

module.exports = ProductController
