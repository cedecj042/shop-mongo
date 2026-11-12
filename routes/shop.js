const express = require('express');

const router = express.Router();

const ShopController = require('../controllers/Shop')

router.get('/', ShopController.index);
router.get('/products',ShopController.getProducts);
router.get('/products/:productId',ShopController.getProduct);
router.get('/cart',ShopController.getCart);
router.post('/cart', ShopController.postCart);
router.post('/cart/delete-item',ShopController.postCartDeleteProducts);
router.post('/orders/create',ShopController.postCreateOrders)
router.get('/orders',ShopController.getOrders);

module.exports = router;