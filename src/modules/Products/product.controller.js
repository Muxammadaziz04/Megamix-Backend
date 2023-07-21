const { languages } = require("../../constants/server.constants")
const ExpressError = require("../../errors/express.error")
const { sequelize } = require("../../services/sequelize.service")
const ProductService = require("./product.service")

const Service = new ProductService(sequelize)

class ProductController {
    async getAll(req, res, next) {
        try {
            const products = await Service.getAll(req.query)
            if (products?.error) throw new ExpressError(products.message)
            res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const product = await Service.getOne(req.params?.id, req.query?.lang)
            if (product?.error) throw new ExpressError(product.message)
            res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    }

    async createProduct(req, res, next) {
        try {
            const body = req.body
            languages.forEach(lang => {
                if(body?.[lang]) {
                    body.languages = body?.languages || []
                    body.languages.push({ ...body?.[lang], lang })
                }
            })
            const product = await Service.createProduct(body)
            if (product?.error) throw new ExpressError(product.message)
            res.status(201).json(product)
        } catch (error) {
            next(error)
        }
    }

    async updateProduct(req, res, next) {
        try {
            const body = req.body
            languages.forEach(lang => {
                if(body?.[lang]) {
                    body.languages = body?.languages || []
                    body.languages.push({ ...body?.[lang], lang })
                }
            })
            console.log(req.params?.id);
            const product = await Service.updateProduct(req.params?.id, req.body)
            if(product?.error) throw new ExpressError(product?.message)
            res.status(203).json(product)
        } catch (error) {
            next(error)
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const product = await Service.deleteProduct(req.params?.id)
            if (product?.error) throw new ExpressError(product.message)
            res.status(203).json(product)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductController()