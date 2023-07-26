const SequelizeError = require("../../errors/sequelize.error")
const VideoModel = require("./video.model")

class VideoService {
    constructor(sequelize) {
        VideoModel(sequelize)
        this.models = sequelize.models
    }

    async getAll({ lang = 'ru' }) {
        try {
            const Video = await this.models.Video.findAll({
                attributes: [[lang, 'description'], 'id', 'video'],
                order: [['createdAt', 'DESC']]
            })
            return Video
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async getById(id, lang) {
        try {
            const Video = await this.models.Video.findOne({
                where: { id },
                ...(lang && { attributes: [[lang, 'description'], 'id', 'images'] }),
            })
            return Video
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async create(body) {
        try {
            const Video = await this.models.Video.create(body)
            return Video
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async update(id, body) {
        try {
            const Video = await this.models.Video.update(body, { where: { id } })
            return Video
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async delete(id) {
        try {
            const Video = await this.models.Video.destroy({ where: { id } })
            return Video
        } catch (error) {
            return new SequelizeError(error)
        }
    }
}

module.exports = VideoService