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

    async create(body) {
        try {
            return await this.models.Slider.create(body)
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async update(body, id) {
        try {
            const status = await this.models.Slider.update(body, { where: { id } })
            return {
                succes: status?.[0] === 1,
                message: status?.[0] === 1 ? 'Slider updated' : 'Slider updated'
            }
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async delete(id) {
        try {
            const status = await this.models.Slider.destroy({ where: { id } })
            return {
                succes: status?.[0] === 1,
                message: status?.[0] === 1 ? 'Slider deleted' : 'Slider not found'
            }
        } catch (error) {
            return new SequelizeError(error)
        }
    }
}

module.exports = SliderService