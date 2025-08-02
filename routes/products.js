const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.js');

router.get('/:id', productsController.getProduct);
router.put('/:id', productsController.updateProductPrice);

module.exports = router;