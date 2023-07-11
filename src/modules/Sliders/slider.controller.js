const ExpressError = require("../../errors/express.error")
const { sequelize } = require("../../services/sequelize.service")
const SliderService = require("./slider.service")
const Service = new SliderService(sequelize)

class SliderController {
    async getAll(req, res, next) {
        try {
            const Slider = await Service.getAll()
            if(Slider) throw new ExpressError(Slider?.message)
            res.status(200).json(Slider)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const Slider = await Service.create(req.body)
            if(Slider) throw new ExpressError(Slider?.message)
            res.status(201).json(Slider)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const Slider = await Service.update(req.body, req.params?.id)
            if(Slider) throw new ExpressError(Slider?.message)
            res.status(203).json(Slider)
        } catch (error) {
           next(error) 
        }
    }

    async delete(req, res, next) {
        try {
            const Slider = await Service.delete(req.params?.id)
            if(Slider) throw new ExpressError(Slider?.message)
            res.status(203).json(Slider)
        } catch (error) {
           next(error) 
        }
    }
}

module.exports = new SliderController()