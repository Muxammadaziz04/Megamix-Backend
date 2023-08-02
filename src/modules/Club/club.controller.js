const { languages } = require("../../constants/server.constants")
const ExpressError = require("../../errors/express.error")
const { imageUpload, removeImage } = require("../../services/image.service")
const { sequelize } = require("../../services/sequelize.service")
const ClubService = require("./club.service")
const Service = new ClubService(sequelize)

class ClubController {
    async getAll(req, res, next) {
        try {
            const Club = await Service.getAll(req.query)
            if(Club?.error) throw new ExpressError(Club?.message)
            res.status(200).json(Club)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const Club = await Service.getById(req.params?.id, req.query?.lang)
            if(Club?.error) throw new ExpressError(Club?.message)
            res.status(200).json(Club)
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
                const ClubFoto = await imageUpload({ image, link: req.protocol + "://" + req.get("host") })
                if (ClubFoto?.url) body.image = ClubFoto.url
                else throw new ExpressError('foto is not uploaded')
            }
            const Club = await Service.create(body)
            if(Club?.error) {
                if (image && typeof body.image === 'string') removeImage(body.image)
                throw new ExpressError(Club?.message)
            }
            res.status(201).json(Club)
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
                const ClubFoto = await imageUpload({ image, link: req.protocol + "://" + req.get("host") })
                if (ClubFoto?.url) body.image = ClubFoto.url
                else throw new ExpressError('foto is not uploaded')
            }
            const Club = await Service.update(body, req.params?.id)
            if(Club?.error) {
                if (image && typeof body.image === 'string') removeImage(body.image)
                throw new ExpressError(Club?.message)
            }
            res.status(203).json(Club)
        } catch (error) {
           next(error) 
        }
    }

    async delete(req, res, next) {
        try {
            let Club = await Service.getById(req.params.id)
            Club = JSON.parse(JSON.stringify(Club))
            if(Club) {
                if(Club.image) removeImage(Club.image)
                const deletedClub = await Service.delete(req.params?.id)
                if(deletedClub?.error) throw new ExpressError(deletedClub?.message)
                res.status(203).json(deletedClub)
            } else {
                throw new ExpressError('Club not found')
            }
        } catch (error) {
           next(error) 
        }
    }
}

module.exports = new ClubController()