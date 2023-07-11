const SequelizeError = require("../../errors/sequelize.error")

class AboutCompanyService {
    constructor(sequelize) {
        this.models = sequelize.models
    }

    async getAll() {
        try {
            
        } catch (error) {
            return new SequelizeError(error)
        }
    }
}

module.exports = AboutCompanyService