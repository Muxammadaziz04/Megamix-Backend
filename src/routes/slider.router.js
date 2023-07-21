const router = require('express').Router()
const Controller = require('../modules/Sliders/slider.controller.js')

router.get('/sliders', Controller.getAll)
router.post('/slider', Controller.create)

module.exports = router