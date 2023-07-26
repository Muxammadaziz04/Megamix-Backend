const SequelizeError = require("../../errors/sequelize.error")
const FotoModel = require("./foto.model")

class FotoService {
    constructor(sequelize) {
        FotoModel(sequelize)
        this.models = sequelize.models
    }

    async getAll({ lang = 'ru' }) {
        try {
            const foto = await this.models.Foto.findAll({
                attributes: [[lang, 'description'], 'id', 'images'],
                order: [['createdAt', 'DESC']]
            })
            return foto
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async getById(id, lang) {
        try {
            const foto = await this.models.Foto.findOne({
                where: { id },
                ...(lang && { attributes: [[lang, 'description'], 'id', 'images'] }),
            })
            return foto
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async create(body) {
        try {
            const foto = await this.models.Foto.create(body)
            return foto
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async update(id, body) {
        try {
            const foto = await this.models.Foto.update(body, { where: { id } })
            return foto
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async delete(id) {
        try {
            const foto = await this.models.Foto.destroy({ where: { id } })
            return foto
        } catch (error) {
            return new SequelizeError(error)
        }
    }
}

module.exports = FotoService