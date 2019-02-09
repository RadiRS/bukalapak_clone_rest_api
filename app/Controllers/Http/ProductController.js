'use strict'

const Product = use('App/Models/Product')
const { validate } = use('Validator')

class ProductController {
  // Function for get all data from products
  async index() {
    const products = await Product.all()
    return { data: products }
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
        status: 'Error',
        product: validation.messages()
      }
    }

    const product = await Product.create(request.all())

    return {
      status: 'Success',
      data: product
    }
  }

  // Function for get individual item from products
  async show({ params: { id } }) {
    const product = await Product.find(id)

    if (product) {
      return {
        status: 'Success',
        data: product
      }
    } else {
      return {
        status: 'Error',
        id
      }
    }
  }

  // Function for update item in products
  async update({ request, params: { id } }) {
    const product = await Product.find(id)

    if (product) {
      const { name, description, qty } = request.post()
      product.name = name
      product.description = description
      product.qty = qty

      await product.save()

      return {
        status: 'Success',
        data: product
      }
    } else {
      return {
        status: 'Error',
        id
      }
    }
  }

  // Function for deleted item in products
  async delete({ params: { id } }) {
    const product = await Product.find(id)

    if (product) {
      await product.delete()

      return {
        status: 'Success',
        id
      }
    } else {
      return {
        status: 'Error',
        id
      }
    }
  }
}

module.exports = ProductController
