const express = require('express');
const router = express.Router();
const ProductModule = require('../modules/product');

// 定義註冊和登錄路由
router.get('/products', ProductModule.GetProducts);
router.get('/products/:id', ProductModule.GetProductById);
router.post('/products', ProductModule.CreateProduct);
router.put('/products/:id', ProductModule.UpdateProduct);
router.delete('/products/:id', ProductModule.DeleteProduct);

module.exports = router;