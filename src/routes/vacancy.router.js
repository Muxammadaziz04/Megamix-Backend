const router = require('express').Router()
const Controller = require('../modules/Vacancy/vacancy.controller.js')

router.get('/vacancy', Controller.getAll)
router.get('/vacancy/:id', Controller.getById)
router.post('/vacancy', Controller.create)
router.put('/vacancy/:id', Controller.update)
router.delete('/vacancy/:id', Controller.delete)

module.exports = router