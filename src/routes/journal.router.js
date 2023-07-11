const router = require('express').Router()
const Controller = require('../modules/Journals/journal.controller')

router.get('/journals', Controller.getAll)
router.post('/journal', Controller.create)
router.put('/journal/:id', Controller.update)
router.delete('/journal/:id', Controller.delete)

module.exports = router