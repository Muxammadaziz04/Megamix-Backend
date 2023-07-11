const { languages } = require("../../constants/server.constants")
const SequelizeError = require("../../errors/sequelize.error")
const ProductLanguageModel = require("../ProductLanguages/ProductLanguage.model")
const ProductModel = require("./product.model")

class ProductService {
    constructor(sequelize) {
        ProductModel(sequelize)
        ProductLanguageModel(sequelize)
        this.models = sequelize.models
        this.sequelize = sequelize
    }

    async getAll({ page = 1, limit = 10, lang, categoryId }) {
        try {
            const products = await this.models.Product.findAndCountAll({
                attributes: { exclude: ['categoryId'] },
                include: [
                    {
                        model: this.models.ProductCategory,
                        as: 'category',
                        attributes: lang ? ['id', [lang, 'name']] : {},
                        where: { ...(categoryId && { id: categoryId }) }
                    },
                    {
                        model: this.models.ProductLanguage,
                        as: 'languages',
                        attributes: { exclude: ['id', 'productId'] },
                        where: lang ? { lang } : {}
                    }
                ],
                limit,
                distinct: true,
                order: [['createdAt', 'DESC']],
                offset: limit * (page - 1)
            })

            products.rows = JSON.parse(JSON.stringify(products?.rows))

            return {
                ...products, rows: products?.rows?.map(prd => {
                    if (lang) {
                        const result = { ...prd, ...prd?.languages?.[0] }
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

    async createProduct(body) {
        try {
            return await this.models.Product.create(body, {
                individualHooks: true,
                include: [
                    { model: this.models.ProductCategory, as: 'category' },
                    { model: this.models.ProductLanguage, as: 'languages' }
                ],
            })
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async deleteProduct(id) {
        try {
            const status = await this.models?.Product.destroy({ where: { id } })
            return {
                succes: status === 1,
                message: status === 1 ? 'Product deleted' : 'Product not found'
            }
        } catch (error) {
            return new SequelizeError(error)
        }
    }
}

module.exports = ProductService