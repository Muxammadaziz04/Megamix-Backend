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
}

module.exports = AdminService