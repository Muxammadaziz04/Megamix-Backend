const ExpressError = require("../../errors/express.error")
const { sequelize } = require("../../services/sequelize.service")
const JournalService = require("./journal.service")
const Service = new JournalService(sequelize)

class JournalController {
    async getAll(req, res, next) {
        try {
            const Journal = await Service.getAll(req.query)
            if(Journal) throw new ExpressError(Journal?.message)
            res.status(200).json(Journal)
        } catch (error) {
            next(error)
        }
    }   

    async create(req, res, next) {
        try {
            const Journal = await Service.create(req.body)
            if(Journal) throw new ExpressError(Journal?.message)
            res.status(201).json(Journal)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const Journal = await Service.update(req.body, req.params?.id)
            if(Journal) throw new ExpressError(Journal?.message)
            res.status(203).json(Journal)
        } catch (error) {
           next(error) 
        }
    }

    async delete(req, res, next) {
        try {
            const Journal = await Service.delete(req.params?.id)
            if(Journal) throw new ExpressError(Journal?.message)
            res.status(203).json(Journal)
        } catch (error) {
           next(error) 
        }
    }
}

module.exports = new JournalController()