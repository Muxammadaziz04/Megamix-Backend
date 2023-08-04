const router = require('express').Router()
const Controller = require('../modules/Users/users.controller')

router.get('/users', Controller.getAll)
router.post('/user', Controller.create)
router.get('/user/:id', Controller.getById)

module.exports = router