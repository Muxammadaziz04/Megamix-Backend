const SequelizeError = require("../../errors/sequelize.error")
const ProductCategoryModel = require("./ProductCategory.model")

class ProductCategoryService {
    constructor(sequelize) {
        ProductCategoryModel(sequelize)
        this.models = sequelize.models
    }

    async getAll({ lang = 'ru' }) {
        try {
            const categories = await this.models.ProductCategory.findAll({ attributes: ['id', [lang, 'name']] })
            return categories
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async createCategory(body) {
        try {
            return await this.models.ProductCategory.create(body)
        } catch (error) {
            return new SequelizeError(error)
        }
    }

    async deleteCategory(id) {
        try {
            const status = await this.models.ProductCategory.destroy({ where: { id } })
            return {
                succes: status?.[0] === 1,
                message: status?.[0] === 1 ? 'Category deleted' : 'Category not found'
            }
        } catch (error) {
            return new SequelizeError(error)
        }
    }
}

module.exports = ProductCategoryService