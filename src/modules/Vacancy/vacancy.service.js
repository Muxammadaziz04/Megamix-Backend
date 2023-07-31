const SequelizeError = require("../../errors/sequelize.error")
const VacancyModel = require("./vacany.model")

class VacancyService {
    constructor(sequelize) {
        VacancyModel(sequelize)
        this.models = sequelize.models
    }

    async getAll({ lang = 'ru' }) {
        try {
            const Vacancy = await this.models.Vacancy.findAll({
                attributes: [[lang, 'description'], 'id', 'salary'],
                order: [['createdAt', 'DESC']]
            })
            return Vacancy
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async getById(id, lang) {
        try {
            const Vacancy = await this.models.Vacancy.findOne({
                where: { id },
                ...(lang && { attributes: [[lang, 'description'], 'id', 'salary'] }),
            })
            return Vacancy
        } catch (error) {
            return new SequelizeError(error)
        } 
    }

    async create(body) {
        try {
            const Vacancy = await this.models.Vacancy.create(body)
            return Vacancy
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async update(id, body) {
        try {
            const Vacancy = await this.models.Vacancy.update(body, { where: { id } })
            return Vacancy
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async delete(id) {
        try {
            const Vacancy = await this.models.Vacancy.destroy({ where: { id } })
            return Vacancy
        } catch (error) {
            return new SequelizeError(error)
        }
    }
}

module.exports = VacancyService