const ExpressError = require("../../errors/express.error");
const { sequelize } = require("../../services/sequelize.service");
const AdminService = require("./admin.service");

const Service = new AdminService(sequelize)

class AdminController {
    async getAll(req, res, next) {
        try {
            const admins = await Service.getAll()
            if(admins?.error) throw new ExpressError(admins.error)
            res.status(200).send(admins)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AdminController()