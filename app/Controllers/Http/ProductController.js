'use strict'

const Product = use('App/Models/Product')
const { validate } = use('Validator')

class ProductController {
  // Function for get all data from products
  async index() {
    const products = await Product.all()
    return products
  }

  // Function for post data product & validation
  async store({ request }) {
    const rules = {
      name: 'required',
      qty: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return {
        status: 'error',
        product: validation.messages()
      }
    }

    const product = await Product.create(request.all())
    return {
      status: 'Success',
      product
    }
  }
}

module.exports = ProductController
