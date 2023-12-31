const SequelizeError = require("../../errors/sequelize.error")
const SliderModel = require("./slider.model")

class SliderService {
    constructor(sequelize) {
        SliderModel(sequelize)
        this.models = sequelize.models
    }

    async getAll(lang = 'ru') {
        try {
            return await this.models.Slider.findAll()
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async getById(id) {
        try {
            return await this.models.Slider.findOne({ where: { id } })
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async create(body) {
        try {
            return await this.models.Slider.create(body)
        } catch (error) {
            return new SequelizeError(error)
        }
    }


    async delete(id) {
        try {
            const status = await this.models.Slider.destroy({ where: { id } })
            return {
                succes: status === 1,
                message: status === 1 ? 'Slider deleted' : 'Slider not found'
            }
        } catch (error) {
            return new SequelizeError(error)
        }
    }
}

module.exports = SliderService