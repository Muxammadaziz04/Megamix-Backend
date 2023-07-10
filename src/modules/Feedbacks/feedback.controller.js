const { feedbackTemplate } = require('../../configs/telegram.config')
const ExpressError = require('../../errors/express.error')
const { sequelize } = require('../../services/sequelize.service')
const telegramService = require('../../services/telegram.service')
const FeedbackService = require('./feedback.service')
const Service = new FeedbackService(sequelize)
require('dotenv').config()

class FeedbackController {
    async getAll(req, res, next) {
        try {
            const feedbacks = await Service.getAll(req.query)
            if (feedbacks?.error) throw new ExpressError(feedbacks?.message)
            res.status(200).json(feedbacks)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const message = feedbackTemplate(req.body)
            await telegramService.sendMessage({ chatId: process.env.CHAT_ID, message })
            const feedback = await Service.create(req.body)
            if (feedback?.error) throw new ExpressError(feedback?.message)
            res.status(201).json(feedback)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const feedback = await Service.getById(req.params?.id)
            if (feedback?.error) throw new ExpressError(feedback?.message)
            res.status(200).json(feedback)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new FeedbackController()