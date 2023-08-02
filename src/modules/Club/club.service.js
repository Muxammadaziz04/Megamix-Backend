const { languages } = require("../../constants/server.constants")
const SequelizeError = require("../../errors/sequelize.error")
const ClubLanguageModel = require("../ClubLanguage/ClubLanguage.model")
const ClubModel = require("./Club.model")

class ClubService {
    constructor(sequelize) {
        ClubModel(sequelize)
        ClubLanguageModel(sequelize)
        this.models = sequelize.models
    }

    async getAll({ limit = 10, page = 1, lang }) {
        try {
            const Club = await this.models.Club.findAndCountAll({
                include: [
                    { model: this.models.ClubLanguage, as: 'languages', where: lang ? { lang } : {} }
                ],
                distinct: true,
                order: [['createdAt', 'DESC']],
                offset: limit * (page - 1)
            })

            Club.rows = JSON.parse(JSON.stringify(Club?.rows))

            return {
                ...Club, rows: Club?.rows?.map(prd => {
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

    async getById(id, lang) {
        try {
            let Club = await this.models.Club.findOne({
                where: { id },
                include: [
                    { model: this.models.ClubLanguage, as: 'languages', where: lang ? { lang } : {} }
                ],
            })

            Club = JSON.parse(JSON.stringify(Club))

            if (lang) {
                Club = {
                    ...Club?.languages?.[0],
                    ...Club
                }
            } else {
                languages?.forEach(lang => {
                    Club = {
                        ...Club,
                        [lang]: Club?.languages?.find(ClubLang => ClubLang?.lang === lang) || {}
                    }
                })
            }
            delete Club?.languages
            return Club
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async create(body) {
        try {
            return await this.models.Club.create(body, {
                include: [
                    { model: this.models.ClubLanguage, as: 'languages' }
                ]
            })
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async update(body, id) {
        try {
            if (body?.languages) {
                await Promise.all(body?.languages?.map(async lang => {
                    const language = await this.models.ClubLanguage.findOne({ where: { lang: lang?.lang, ClubId: id } })
                    if (language) {
                        await this.models.ClubLanguage.update(lang, { where: { lang: lang?.lang, ClubId: id } })
                    } else {
                        this.models.ClubLanguage.create({ ...lang, ClubId: id })
                    }
                }))
            }
            const status = await this.models.Club.update({image: body?.image}, { where: { id } })
            return {
                succes: status?.[0] === 1,
                message: status?.[0] === 1 ? 'Club updated' : 'Club is not updated'
            }
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async delete(id) {
        try {
            const status = await this.models.Club.destroy({ where: { id } })
            return {
                succes: status?.[0] === 1,
                message: status?.[0] === 1 ? 'Club deleted' : 'Club not found'
            }
        } catch (error) {
            return new SequelizeError(error)
        }
    }
}

module.exports = ClubService