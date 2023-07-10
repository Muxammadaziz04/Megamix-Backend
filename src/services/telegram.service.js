const { Telegraf } = require('telegraf');
require('dotenv').config()

const app = new Telegraf(process.env.BOT_TOKEN);

class Telegram {
    async sendMessage({ chatId, message = '' }) {
        return await app.telegram.sendMessage(chatId, message)
    }
}

module.exports = new Telegram();