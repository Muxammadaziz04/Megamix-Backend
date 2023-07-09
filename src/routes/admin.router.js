const router = require('express').Router()
const AdminController = require('../modules/Admin/admin.controller.js')

router.get('/admins', AdminController.getAll)

module.exports = router