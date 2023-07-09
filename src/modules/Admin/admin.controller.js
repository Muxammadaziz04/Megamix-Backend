const ExpressError = require("../../errors/express.error");
const { sequelize } = require("../../services/sequelize.service");
const AdminService = require("./admin.service");

const Service = new AdminService(sequelize)

class AdminController {
    async getAll(req, res, next) {
        try {
            const admins = await Service.getAll()
            if(admins?.error) throw new ExpressError(admins.message)
            res.status(200).send(admins)
        } catch (error) {
            next(error)
        }
    }

    async createAdmin(req, res, next) {
        try {
            const admin = await Service.createAdmin(req.body)
            if(admin?.error) throw new ExpressError(admin.message)
            res.status(201).send(admin)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AdminController()