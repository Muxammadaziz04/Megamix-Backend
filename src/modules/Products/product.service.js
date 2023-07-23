const { Op } = require("sequelize")
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

    async getOne(id, lang) {
        try {
            let product = await this.models.Product.findOne({
                where: { id },
                attributes: { exclude: ['categoryId'] },
                include: [
                    {
                        model: this.models.ProductCategory,
                        as: 'category',
                        attributes: lang ? ['id', [lang, 'name']] : {},
                    },
                    {
                        model: this.models.ProductLanguage,
                        as: 'languages',
                        attributes: { exclude: ['id', 'productId'] },
                        where: lang ? { lang } : {}
                    }
                ],
            })

            product = JSON.parse(JSON.stringify(product))

            if (lang) {
                product = {
                    ...product?.languages?.[0],
                    ...product
                }
            } else {
                languages?.forEach(lang => {
                    product = {
                        ...product,
                        [lang]: product?.languages?.find(productLang => productLang?.lang === lang) || {}
                    }
                })
            }
            delete product.languages
            return product
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

    async updateProduct(id, body) {
        try {
            if (body?.languages) {
                await Promise.all(body?.languages?.map(async lang => {
                    const language = await this.models.ProductLanguage.findOne({ where: { lang: lang?.lang, productId: id } })
                    if (language) {
                        await this.models.ProductLanguage.update(lang, { where: { lang: lang?.lang, productId: id } })
                    } else {
                        this.models.ProductLanguage.create({ ...lang, productId: id })
                    }
                }))
            }
            const status = await this.models.Product.update(body, { where: { id } })
            return {
                succes: status?.[0] === 1,
                message: status?.[0] === 1 ? 'Product updated' : 'Product is not updated'
            }
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async deleteProduct(id) {
        try {
            const status = await this.models?.Product.destroy({ where: { id }, returning: true })
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