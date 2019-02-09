'use strict';

const Product = use('App/Models/Product');

class ProductController {
  async index() {
    return await Product.all();
  }

  store({ request }) {
    Product.create(request);

    return 'Success';
  }
}

module.exports = ProductController;
