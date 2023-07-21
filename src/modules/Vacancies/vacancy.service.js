const SequelizeError = require("../../errors/sequelize.error")
const VacancyModel = require("./vacancy.model")

class VacancyService {
    constructor(sequelize) {
        VacancyModel(sequelize)
        this.models = sequelize.models
    }

    async getAll({ lang = 'ru' }) {
        try {
            return await this.models.Vacancy.findAll({ attributes: [[lang, 'title']] })
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async create(body) {
        try {
            return await this.models.Vacancy.create(body)
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async update(body, id) {
        try {
            const status = await this.models.Vacancy.update(body, { where: { id } })
            return {
                succes: status?.[0] === 1,
                message: status?.[0] === 1 ? 'Vacancy updated' : 'Vacancy updated'
            }
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async delete(id) {
        try {
            const status = await this.models.Vacancy.destroy({ where: { id } })
            return {
                succes: status?.[0] === 1,
                message: status?.[0] === 1 ? 'Vacancy deleted' : 'Vacancy not found'
            }
        } catch (error) {
            return new SequelizeError(error)
        }
    }
}

module.exports = VacancyService