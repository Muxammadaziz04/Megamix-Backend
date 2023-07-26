const router = require('express').Router()
const Controller = require('../modules/Foto/foto.controller.js')

router.get('/foto', Controller.getAll)
router.get('/foto/:id', Controller.getById)
router.post('/foto', Controller.create)
router.put('/foto/:id', Controller.update)
router.delete('/foto/:id', Controller.delete)

module.exports = router