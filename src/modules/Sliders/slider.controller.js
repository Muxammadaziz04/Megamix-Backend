const ExpressError = require("../../errors/express.error")
const { sequelize } = require("../../services/sequelize.service")
const SliderService = require("./slider.service")
const Service = new SliderService(sequelize)

class SliderController {
    async getAll(req, res, next) {
        try {
            const slider = await Service.getAll(req.query?.lang)
            if(slider?.error) throw new ExpressError(slider?.message)
            res.status(200).json(slider)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const slider = await Service.create(req.body)
            if(slider) throw new ExpressError(slider?.message)
            res.status(201).json(slider)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const slider = await Service.update(req.body, req.params?.id)
            if(slider) throw new ExpressError(slider?.message)
            res.status(203).json(slider)
        } catch (error) {
           next(error) 
        }
    }

    async delete(req, res, next) {
        try {
            const slider = await Service.delete(req.params?.id)
            if(slider) throw new ExpressError(slider?.message)
            res.status(203).json(slider)
        } catch (error) {
           next(error) 
        }
    }
}

module.exports = new SliderController()