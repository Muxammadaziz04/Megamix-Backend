const SequelizeError = require("../../errors/sequelize.error")

class NameService {
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

module.exports = NameService