const router = require('express')?.Router()
const Controller = require('../modules/Club/club.controller.js')

router.get('/club', Controller.getAll)
router.get('/club/:id', Controller.getById)
router.post('/club', Controller.create)
router.put('/club/:id', Controller.update)
router.delete('/club/:id', Controller.delete)

module.exports = router