const ExpressError = require("../../errors/express.error")
const { sequelize } = require("../../services/sequelize.service")
const FotoService = require("./foto.service")
const Service = new FotoService(sequelize)

class FotoController {
    async getAll(req, res, next) {
        try {
          const fotos = await Service.getAll(req.query)
          res.status(200).json(fotos)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
          const fotos = await Service.getById(req.params.id, req.query?.lang)
          res.status(200).json(fotos)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const foto = await Service.create(req.body)
            if(foto?.error) throw new ExpressError(foto?.error)
            res.status(201).json(foto)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const foto = await Service.update(req.params?.id, req.body)
            if(foto?.error) throw new ExpressError(foto?.error)
            res.status(203).json(foto)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const foto = await Service.delete(req.params?.id)
            if(foto?.error) throw new ExpressError(foto?.error)
            res.status(203).json(foto)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new FotoController()