const router = require('express').Router()
const Controller = require('../modules/Feedbacks/feedback.controller')

router.get('/feedbacks', Controller.getAll)
router.post('/feedback', Controller.create)
router.get('/feedback/:id', Controller.getById)

module.exports = router