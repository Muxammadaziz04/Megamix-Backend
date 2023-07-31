const ExpressError = require("../../errors/express.error")
const { sequelize } = require("../../services/sequelize.service")
const VacancyService = require("./vacancy.service")
const Service = new VacancyService(sequelize)

class VacancyController {
    async getAll(req, res, next) {
        try {
          const vacancy = await Service.getAll(req.query)
          res.status(200).json(vacancy)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
          const vacancy = await Service.getById(req.params.id, req.query?.lang)
          res.status(200).json(vacancy)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const vacancy = await Service.create(req.body)
            if(vacancy?.error) throw new ExpressError(vacancy?.message)
            res.status(201).json(vacancy)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const vacancy = await Service.update(req.params?.id, req.body)
            if(vacancy?.error) throw new ExpressError(vacancy?.error)
            res.status(203).json(vacancy)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const vacancy = await Service.delete(req.params?.id)
            if(vacancy?.error) throw new ExpressError(vacancy?.error)
            res.status(203).json(vacancy)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new VacancyController()