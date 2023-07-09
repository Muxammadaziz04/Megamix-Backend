const router = require('express').Router()
const AdminController = require('../modules/Admin/admin.controller.js')

router.get('/admins', AdminController.getAll)
router.post('/admin', AdminController.createAdmin)

module.exports = router