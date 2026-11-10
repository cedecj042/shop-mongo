const path = require('path');

const express = require('express');

const router = express.Router();
const AdminProductController = require('../controllers/Admin/Product')

router.get('/products', AdminProductController.getProducts);
router.get('/products/create',AdminProductController.createProducts);
router.post('/products/create', AdminProductController.storeProducts);
router.get('/products/edit/:productId', AdminProductController.getEditProducts);
router.post('/products/edit', AdminProductController.postEditProducts);
router.post('/products/delete', AdminProductController.deleteProduct);

module.exports = router;