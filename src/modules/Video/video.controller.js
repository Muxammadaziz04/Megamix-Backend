const ExpressError = require("../../errors/express.error")
const { sequelize } = require("../../services/sequelize.service")
const VideoService = require("./video.service")
const Service = new VideoService(sequelize)

class VideoController {
    async getAll(req, res, next) {
        try {
          const Videos = await Service.getAll(req.query)
          res.status(200).json(Videos)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
          const Videos = await Service.getById(req.params.id, req.query?.lang)
          res.status(200).json(Videos)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const Video = await Service.create(req.body)
            if(Video?.error) throw new ExpressError(Video?.error)
            res.status(201).json(Video)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const Video = await Service.update(req.params?.id, req.body)
            if(Video?.error) throw new ExpressError(Video?.error)
            res.status(203).json(Video)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const Video = await Service.delete(req.params?.id)
            if(Video?.error) throw new ExpressError(Video?.error)
            res.status(203).json(Video)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new VideoController()