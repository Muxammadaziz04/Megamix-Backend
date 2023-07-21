const SequelizeError = require("../../errors/sequelize.error")
const PartnerModel = require("./partner.model")

class PartnerService {
    constructor(sequelize) {
        PartnerModel(sequelize)
        this.models = sequelize.models
    }

    async getAll() {
        try {
            return await this.models.Partner.findAll()
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async createPartner(body) {
        try {
            return await this.models.Partner.create(body)
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async deletePartner(id) {
        try {
            const partner = await this.models.Partner.destroy({ where: { id } })
            return partner?.[0] === 1 ? { success: true, message: 'Partner deleted' } : { success: false, message: 'Partner is not found' }
        } catch (error) {
            return new SequelizeError(error)
        }
    }
}

module.exports = PartnerService