const router = require('express').Router()
const Controller = require('../modules/ProductCategories/ProductCategory.controller.js')

router.get('/product_categories', Controller.getAll)
router.post('/product_category', Controller.createCategory)
router.delete('/product_category/:id', Controller.deleteCategory)

module.exports = router