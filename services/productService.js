const axios = require('axios');
const Price = require('../models/Price');

const EXTERNAL_API_URL = 'https://fakestoreapi.com/products';

class ProductService {
  async getProductById(productId) {
    try {
      const externalResponse = await axios.get(`${EXTERNAL_API_URL}/${productId}`);
      const externalProduct = externalResponse.data;

      const price = await Price.findOne({ productId });
      if (!price) {
        throw new Error('Price not found');
      }

      return {
        id: productId,
        title: externalProduct.title,
        current_price: {
          value: price.value,
          currency_code: price.currency_code
        }
      };
    } catch (error) {
      console.error('Error in ProductService:', error);
      throw error;
    }
  }

  async updateProductPrice(productId, newPrice) {
    try {
      const validCurrencies = ['USD', 'EUR', 'GBP'];
      if (!validCurrencies.includes(newPrice.currency_code)) {
        throw new Error('Invalid currency code');
      }

      const updatedPrice = await Price.findOneAndUpdate(
        { productId },
        {
          value: newPrice.value,
          currency_code: newPrice.currency_code
        },
        { new: true, upsert: true }
      );

      return this.getProductById(productId);
    } catch (error) {
      console.error('Error updating product price:', error);
      throw error;
    }
  }
}

module.exports = new ProductService();