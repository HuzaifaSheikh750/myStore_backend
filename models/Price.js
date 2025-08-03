const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true
  },
  value: {
    type: Number,
    required: true
  },
  currency_code: {
    type: String,
    required: true,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP'] 
  }
});

module.exports = mongoose.model('Price', priceSchema);