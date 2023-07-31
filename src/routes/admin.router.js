const router = require('express').Router()
const AuthMiddleware = require('../middlewares/auth.middleware.js')
const AdminController = require('../modules/Admin/admin.controller.js')

router.get('/admins', AdminController.getAll)
router.post('/admin', AdminController.createAdmin)
router.post('/login', AdminController.login)
router.get('/me', AuthMiddleware,    AdminController.getMe)

module.exports = router