const { UserTemplate } = require('../../configs/telegram.config')
const ExpressError = require('../../errors/express.error')
const { sequelize } = require('../../services/sequelize.service')
const telegramService = require('../../services/telegram.service')
const UserService = require('./users.service')
const Service = new UserService(sequelize)
require('dotenv').config()

class UserController {
    async getAll(req, res, next) {
        try {
            const Users = await Service.getAll(req.query)
            if (Users?.error) throw new ExpressError(Users?.message)
            res.status(200).json(Users)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const message = UserTemplate(req.body)
            await telegramService.sendMessage({ chatId: process.env.USER_CHAT_ID, message })
            const User = await Service.create(req.body)
            if (User?.error) throw new ExpressError(User?.message)
            res.status(201).json(User)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const User = await Service.getById(req.params?.id)
            if (User?.error) throw new ExpressError(User?.message)
            res.status(200).json(User)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()