const ExpressError = require("../../errors/express.error");
const { sequelize } = require("../../services/sequelize.service");
const jwt = require('../../services/jwt.service.js')
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

    async login(req, res, next) {
        try {
            const { login, password } = req.body
            const admin = await Service.getByLogin(login, password)
            if(!admin || admin?.error) {
                throw new ExpressError('Incorrect id or password', 409)
            } else {
                const token = jwt.sign(JSON.stringify({...admin?.dataValues}))
                res
                    .status(200)
                    .cookie('access_token', token, { 
                        httpOnly: true, 
                        secure: true, 
                        sameSite: 'none',
                    })
                    .send({ admin, success: true })
            }
        } catch (error) {
            next(error)
        }
    }

    async getMe(req, res, next) {
        try {
            const admin = await Service.getById(req.user?.id)
            if (!admin) {
                req.status(400).send(new ExpressError('admin not found', 400))
            } else {
                res.status(200).send(admin)
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AdminController()