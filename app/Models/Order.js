'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Product = use('App/Models/Product')

class Order extends Model {
  // Get all data order
  getOrders() {
    return Order.query()
      .with('products')
      .fetch()
  }

  // Get data order
  getOrder(id) {
    return Order.find(id)
  }

  // Get data product order
  getOrderProduct(product_id) {
    return Order.findBy('product_id', product_id)
  }

  // Create order transaction
  storeOrderProduct(data) {
    return Order.create(data)
  }

  // Update product order
  async updateOrderProduct(data, id) {
    const order = await this.getOrder(id)

    if (order) {
      order.merge(data)
      await order.save()
    }
    return order
  }

  // Deleted product item
  async deleteOrder(id) {
    const order = await Order.find(id)

    if (order) {
      await order.delete()

      return {
        status: 'Item telah dihapus dari keranjang',
        order
      }
    } else {
      return {
        status: 'Item gagal dihapus',
        id
      }
    }
  }

  // Join with product
  products() {
    return this.belongsTo(Product)
  }
}

module.exports = Order
