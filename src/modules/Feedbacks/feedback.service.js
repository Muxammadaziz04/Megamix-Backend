const SequelizeError = require("../../errors/sequelize.error")
const FeedbackModel = require("./feedback.model")

class FeedbackService {
    constructor(sequelize) {
        FeedbackModel(sequelize)
        this.models = sequelize.models
    }

    async getAll({ page = 1, limit = 10 }) {
        try {
            return await this.models.Feedback.findAndCountAll({ limit, offset: limit * (page - 1) })
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async create(body) {
        try {
            return await this.models.Feedback.create(body)
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async getById(id) {
        try {
            return await this.models.Feedback.findByPk(id)
        } catch (error) {
            return new SequelizeError(error)
        }
    }
}

module.exports = FeedbackService