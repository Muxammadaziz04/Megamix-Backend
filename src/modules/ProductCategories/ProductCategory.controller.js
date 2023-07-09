const ExpressError = require("../../errors/express.error")
const { sequelize } = require("../../services/sequelize.service")
const ProductCategoryService = require("./ProductCategory.service")

const Service = new ProductCategoryService(sequelize)

class ProductCategoryController {
    async getAll(req, res, next) {
        try {
            const categories = await Service.getAll(req.query)
            if(categories?.error) throw new ExpressError(categories?.message)
            res.status(200).json(categories)
        } catch (error) {
            next(error)
        }
    }

    async createCategory(req, res, next) {
        try {
            const category = await Service.createCategory(req.body)
            if(category?.error) throw new ExpressError(category?.message)
            res.status(201).json(category)
        } catch (error) {
            next(error)
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const category = await Service.deleteCategory(req.params?.id)
            if(category?.error) throw new ExpressError(category?.message)
            res.status(203).json(category)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductCategoryController()