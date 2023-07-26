const router = require('express').Router()
const Controller = require('../modules/File/file.controller')

router.post('/file', Controller.uploadFile)

module.exports = router