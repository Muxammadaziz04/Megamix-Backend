const { languages } = require("../../constants/server.constants")
const ExpressError = require("../../errors/express.error")
const { sequelize } = require("../../services/sequelize.service")
const NewsService = require("./news.service")
const Service = new NewsService(sequelize)

class NewsController {
    async getAll(req, res, next) {
        try {
            const news = await Service.getAll(req.query)
            if(news?.error) throw new ExpressError(news?.message)
            res.status(200).json(news)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const news = await Service.getById(req.params?.id, req.query?.lang)
            if(news?.error) throw new ExpressError(news?.message)
            res.status(200).json(news)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const body = req.body
            languages.forEach(lang => {
                if(body?.[lang]) {
                    body.languages = body?.languages || []
                    body.languages.push({ ...body?.[lang], lang })
                }
            })
            const news = await Service.create(body)
            if(news?.error) throw new ExpressError(news?.message)
            res.status(201).json(news)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const body = req.body
            languages.forEach(lang => {
                if(body?.[lang]) {
                    body.languages = body?.languages || []
                    body.languages.push({ ...body?.[lang], lang })
                }
            })
            const news = await Service.update(body, req.params?.id)
            if(news?.error) throw new ExpressError(news?.message)
            res.status(203).json(news)
        } catch (error) {
           next(error) 
        }
    }

    async delete(req, res, next) {
        try {
            const news = await Service.delete(req.params?.id)
            if(news?.error) throw new ExpressError(news?.message)
            res.status(203).json(news)
        } catch (error) {
           next(error) 
        }
    }
}

module.exports = new NewsController()