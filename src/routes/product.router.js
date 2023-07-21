const router = require('express').Router()
const Controller = require('../modules/Products/product.controller')

router.get('/products', Controller.getAll)
router.get('/product/:id', Controller.getOne)
router.post('/product', Controller.createProduct)
router.put('/product/:id', Controller.updateProduct)
router.delete('/product/:id', Controller.deleteProduct)

module.exports = router