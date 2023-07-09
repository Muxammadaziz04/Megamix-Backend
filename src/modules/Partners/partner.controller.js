const ExpressError = require('../../errors/express.error.js')
const { sequelize } = require('../../services/sequelize.service')
const PartnerService = require('./partner.service.js')

const Service = new PartnerService(sequelize)

class PartnerController {
    async getAll(req, res, next) {
        try {
            const partners = await Service.getAll()
            if(partners?.error) throw new ExpressError(partners.message)
            res.status(200).send(partners)
        } catch (error) {
            next(error)
        }
    }

    async createPartner(req, res, next) {
        try {
            const partner = await Service.createPartner(req.body)
            if(partner?.error) throw new ExpressError(partner.message)
            res.status(201).send(partner)
        } catch (error) {
            next(error)
        }
    }

    async deleteParner(req, res, next) {
        try {
            const partner = await Service.deletePartner(req.params?.id)
            if(partner?.error) throw new ExpressError(partner.message)
            res.status(203).json(partner)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PartnerController()