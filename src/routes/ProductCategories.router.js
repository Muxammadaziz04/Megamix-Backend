const router = require('express').Router()
const Controller = require('../modules/ProductCategories/ProductCategory.controller.js')

router.get('/categories', Controller.getAll)
router.post('/category', Controller.createCategory)
router.delete('/category/:id', Controller.deleteCategory)

module.exports = router