'use strict'

const Order = use('App/Models/Order')
const { validate } = use('Validator')

class OrderController {
  // Function for get all data from orders join products
  async index() {
    const orders = await Order.query()
      .with('products')
      .fetch()

    return orders
  }

  // Function for post data Order & validation
  async store({ request }) {
    const { product_id } = request.post()

    // const data = await Order.find(product_id)
    const data = await Order.query()
      .where('product_id', product_id)
      .getCount()

    // return { data }

    if (data !== 0) {
      return { status: 'Item sudah ada' }
    }

    const rules = {
      product_id: 'required',
      qty: 'required',
      price: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return {
        status: 'Error',
        order: validation.messages()
      }
    }

    const order = await Order.create(request.all())

    return {
      status: 'Item telah ditambahkan dikeranjang belanja',
      data: order
    }
  }

  // Function for get individual item from orders
  async show({ params: { id } }) {
    const order = await Order.find(id)

    if (order) {
      return {
        status: 'Success',
        data: order
      }
    } else {
      return {
        status: 'Error',
        id
      }
    }
  }

  // Function for update item in orders
  async update({ request, params: { id } }) {
    const order = await Order.find(id)

    if (order) {
      const { qty, price } = request.post()
      order.qty = qty
      order.price = price

      await order.save()

      return {
        status: 'Success',
        data: order
      }
    } else {
      return {
        status: 'Error',
        id
      }
    }
  }

  // Function for deleted item in orders
  async delete({ params: { id } }) {
    const order = await Order.find(id)

    if (order) {
      await order.delete()

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

module.exports = OrderController
