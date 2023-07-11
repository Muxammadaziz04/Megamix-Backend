const { languages } = require("../../constants/server.constants")
const SequelizeError = require("../../errors/sequelize.error")
const JournalLanguageModel = require("../JournalLanguages/JournalLanguages.model")
const JournalModel = require("./journal.model")

class JournalService {
    constructor(sequelize) {
        JournalModel(sequelize)
        JournalLanguageModel(sequelize)
        this.models = sequelize.models
    }

    async getAll({ limit = 10, page = 1, lang }) {
        try {
            const journals =  await this.models.Journal.findAndCountAll({
                include: [
                    { model: this.models.JournalLanguage, as: 'languages', where: lang ? { lang } : {} }
                ],
                distinct: true,
                order: [['createdAt', 'DESC']],
                offset: limit * (page - 1)
            })

            journals.rows = JSON.parse(JSON.stringify(journals?.rows))

            return {
                ...journals, rows: journals?.rows?.map(prd => {
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
            return await this.models.Journal.create(body, {
                include: [
                    { model: this.models.JournalLanguage, as: 'languages' }
                ]
            })
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async update(body, id) {
        try {
            const status = await this.models.Journal.update(body, { where: { id } })
            return {
                succes: status === 1,
                message: status === 1 ? 'Journal updated' : 'Journal updated'
            }
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async delete(id) {
        try {
            const status = await this.models.Journal.destroy({ where: { id } })
            return {
                succes: status === 1,
                message: status === 1 ? 'Journal deleted' : 'Journal not found'
            }
        } catch (error) {
            return new SequelizeError(error)
        }
    }
}

module.exports = JournalService