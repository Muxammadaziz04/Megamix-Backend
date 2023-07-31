const sha256 = require('sha256')
const SequelizeError = require("../../errors/sequelize.error");
const AdminModel = require("./admin.model");

class AdminService {
    constructor(sequelize) {
        AdminModel(sequelize)
        this.models = sequelize.models
    }

    async getAll() {
        try {
            return await this.models.Admin.findAll()
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async createAdmin(body) {
        try {
            return await this.models.Admin.create(body, { individualHooks: true })
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async getByLogin(login, password) {
        try {
            return await this.models.Admin.findOne({ where: { login, password: sha256(password) } })
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async getById(id) {
        try {
            return await this.models.Admin.findOne({ where: { id } })
        } catch (error) {
            return new SequelizeError(error)
        }
    }
}

module.exports = AdminService