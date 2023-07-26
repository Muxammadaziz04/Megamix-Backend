const router = require('express').Router()
const Controller = require('../modules/Video/video.controller')

router.get('/video', Controller.getAll)
router.get('/video/:id', Controller.getById)
router.post('/video', Controller.create)
router.put('/video/:id', Controller.update)
router.delete('/video/:id', Controller.delete)

module.exports = router