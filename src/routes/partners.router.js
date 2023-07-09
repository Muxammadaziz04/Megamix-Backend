const router = require('express').Router()
const PartnersController = require('../modules/Partners/partner.controller')

router.get('/partners', PartnersController.getAll)
router.post('/partner', PartnersController.createPartner)
router.delete('/partner/:id', PartnersController.deleteParner)

module.exports = router