const ExpressError = require("../../errors/express.error")
const { sequelize } = require("../../services/sequelize.service")
const VacancyService = require("./vacancy.service")
const Service = new VacancyService(sequelize)

class VacancyController {
    async getAll(req, res, next) {
        try {
            const Vacancy = await Service.getAll(req.query)
            if(Vacancy) throw new ExpressError(Vacancy?.message)
            res.status(200).json(Vacancy)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const Vacancy = await Service.create(req.body)
            if(Vacancy) throw new ExpressError(Vacancy?.message)
            res.status(201).json(Vacancy)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const Vacancy = await Service.update(req.body, req.params?.id)
            if(Vacancy) throw new ExpressError(Vacancy?.message)
            res.status(203).json(Vacancy)
        } catch (error) {
           next(error) 
        }
    }

    async delete(req, res, next) {
        try {
            const Vacancy = await Service.delete(req.params?.id)
            if(Vacancy) throw new ExpressError(Vacancy?.message)
            res.status(203).json(Vacancy)
        } catch (error) {
           next(error) 
        }
    }
}

module.exports = new VacancyController()