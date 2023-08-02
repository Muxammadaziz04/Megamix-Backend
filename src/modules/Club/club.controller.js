const { languages } = require("../../constants/server.constants")
const ExpressError = require("../../errors/express.error")
const { imageUpload, removeImage } = require("../../services/image.service")
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
            const image = req.files?.image
            languages.forEach(lang => {
                if(body?.[lang]) {
                    if(typeof body?.[lang] === 'string') body[lang] =
                     JSON.parse(body[lang])
                    body.languages = body?.languages || []
                    body.languages.push({ ...body?.[lang], lang })
                }
            })
            if (image) {
                const newsFoto = await imageUpload({ image, link: req.protocol + "://" + req.get("host") })
                if (newsFoto?.url) body.image = newsFoto.url
                else throw new ExpressError('foto is not uploaded')
            }
            const news = await Service.create(body)
            if(news?.error) {
                if (image && typeof body.image === 'string') removeImage(body.image)
                throw new ExpressError(news?.message)
            }
            res.status(201).json(news)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const body = req.body
            const image = req.files?.image
            languages.forEach(lang => {
                if(body?.[lang]) {
                    if(typeof body?.[lang] === 'string') body[lang] =
                     JSON.parse(body[lang])
                    body.languages = body?.languages || []
                    body.languages.push({ ...body?.[lang], lang })
                }
            })
            if (image) {
                const newsFoto = await imageUpload({ image, link: req.protocol + "://" + req.get("host") })
                if (newsFoto?.url) body.image = newsFoto.url
                else throw new ExpressError('foto is not uploaded')
            }
            const news = await Service.update(body, req.params?.id)
            if(news?.error) {
                if (image && typeof body.image === 'string') removeImage(body.image)
                throw new ExpressError(news?.message)
            }
            res.status(203).json(news)
        } catch (error) {
           next(error) 
        }
    }

    async delete(req, res, next) {
        try {
            let news = await Service.getById(req.params.id)
            news = JSON.parse(JSON.stringify(news))
            if(news) {
                if(news.image) removeImage(news.image)
                const deletedNews = await Service.delete(req.params?.id)
                if(deletedNews?.error) throw new ExpressError(deletedNews?.message)
                res.status(203).json(deletedNews)
            } else {
                throw new ExpressError('News not found')
            }
        } catch (error) {
           next(error) 
        }
    }
}

module.exports = new NewsController()