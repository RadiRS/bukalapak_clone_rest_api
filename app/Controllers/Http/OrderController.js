'use strict'

const Order = use('App/Models/Order')
const { validate } = use('Validator')

class OrderController {
  // Function for get all data from orders join products
  async index() {
    const order = new Order()

    try {
      return await order.getOrders()
    } catch (error) {
      return { massage: error.message }
    }
  }

  // Function for get individual item from products
  async show({ params: { id } }) {
    const order = new Order()
    const data = await order.getOrder(id)

    if (data) {
      return data
    } else {
      return {
        status: 'Error',
        id
      }
    }
  }

  // Function for post data Order & validation
  async store({ request }) {
    const order = new Order()
    const { product_id } = request.post()

    const product = await order.getOrderProduct(product_id)

    if (product) {
      product.qty += 1
      await product.save()
      return { status: 'Kuantiti item ditambahkan', data: product }
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
        data: validation.messages()
      }
    }

    try {
      const data = await order.storeOrderProduct(request.all())
      return {
        status: 'Item telah ditambahkan dikeranjang belanja',
        data
      }
    } catch (error) {
      return {
        status: error.message
      }
    }
  }

  // Function for update item in orders
  async update({ request, params: { id } }) {
    const order = new Order()

    try {
      const data = order.updateOrderProduct(request.all(), id)
      return data
    } catch (error) {
      return { status: error.message }
    }
  }

  // Function for deleted item in orders
  async delete({ params: { id } }) {
    const order = new Order()

    try {
      const data = await order.deleteOrder(id)
      return data
    } catch (error) {
      return { status: error.message }
    }
  }
}

module.exports = OrderController
