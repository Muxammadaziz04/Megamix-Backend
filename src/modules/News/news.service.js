const { languages } = require("../../constants/server.constants")
const SequelizeError = require("../../errors/sequelize.error")
const NewsLanguageModel = require("../NewsLanguage/NewsLanguage.model")
const NewsModel = require("./news.model")

class NewsService {
    constructor(sequelize) {
        NewsModel(sequelize)
        NewsLanguageModel(sequelize)
        this.models = sequelize.models
    }

    async getAll({ limit = 10, page = 1, lang }) {
        try {
            const news = await this.models.News.findAndCountAll({
                include: [
                    { model: this.models.NewsLanguage, as: 'languages', where: lang ? { lang } : {} }
                ],
                distinct: true,
                order: [['createdAt', 'DESC']],
                offset: limit * (page - 1)
            })

            news.rows = JSON.parse(JSON.stringify(news?.rows))

            return {
                ...news, rows: news?.rows?.map(prd => {
                    if (lang) {
                        const result = { ...prd?.languages?.[0], ...prd }
                        delete result.languages
                        return result
                    } else {
                        languages.forEach(lang => {
                            prd = { ...prd, [lang]: prd?.languages?.find(translate => translate?.lang === lang) || {} }
                        })
                        delete prd?.languages
                        return prd
                    }
                })
            }
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async create(body) {
        try {
            return await this.models.News.create(body, {
                include: [
                    { model: this.models.NewsLanguage, as: 'languages' }
                ]
            })
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async update(body, id) {
        try {
            const status = await this.models.News.update(body, { where: { id } })
            return {
                succes: status === 1,
                message: status === 1 ? 'News updated' : 'News updated'
            }
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async delete(id) {
        try {
            const status = await this.models.News.destroy({ where: { id } })
            return {
                succes: status === 1,
                message: status === 1 ? 'News deleted' : 'News not found'
            }
        } catch (error) {
            return new SequelizeError(error)
        }
    }
}

module.exports = NewsService