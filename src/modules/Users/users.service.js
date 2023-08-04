const SequelizeError = require("../../errors/sequelize.error")
const UsersModel = require("./users.model")

class UsersService {
    constructor(sequelize) {
        UsersModel(sequelize)
        this.models = sequelize.models
    }

    async getAll({ page = 1, limit = 10 }) {
        try {
            return await this.models.Users.findAndCountAll({ limit, offset: limit * (page - 1) })
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async create(body) {
        try {
            return await this.models.Users.create(body)
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async getById(id) {
        try {
            return await this.models.Users.findByPk(id)
        } catch (error) {
            return new SequelizeError(error)
        }
    }
}

module.exports = UsersService