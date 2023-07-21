const router = require('express').Router()
const Controller = require('../modules/News/news.controller')

router.get('/news', Controller.getAll)
router.get('/news/:id', Controller.getById)
router.post('/news', Controller.create)
router.put('/news/:id', Controller.update)
router.delete('/news/:id', Controller.delete)

module.exports = router