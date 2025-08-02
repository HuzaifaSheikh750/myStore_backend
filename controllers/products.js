const productService = require('../services/productService');

exports.getProduct = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = await productService.getProductById(productId);
    res.json(product);
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: 'Product not found' });
    }
    next(error);
  }
};

exports.updateProductPrice = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const { current_price } = req.body;
    if (!current_price || !current_price.value || !current_price.currency_code) {
      return res.status(400).json({ error: 'Invalid price data' });
    }

    const updatedProduct = await productService.updateProductPrice(
      productId,
      current_price
    );
    
    res.json(updatedProduct);
  } catch (error) {
    if (error.message.includes('Invalid currency code')) {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
};