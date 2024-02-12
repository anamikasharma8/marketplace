// routes.js
const express = require('express');
const productController = require('./productController');

const router = express.Router();

// Welcome message route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the dress store application' });
});

// Routes for CRUD operations
router.get('/api/products', productController.getAllProducts);
router.get('/api/products/:id', productController.getProductById);
router.post('/api/products', productController.addNewProduct);
router.put('/api/products/:id', productController.updateProductById);
router.delete('/api/products/:id', productController.deleteProductById);
router.delete('/api/products', productController.deleteAllProducts);

// Additional route for finding products by name
router.get('/api/products/search/:keyword', productController.findProductsByName);

module.exports = router;
