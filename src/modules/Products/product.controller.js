const { languages } = require("../../constants/server.constants")
const ExpressError = require("../../errors/express.error")
const { imageUpload, removeImage } = require("../../services/image.service")
const { sequelize } = require("../../services/sequelize.service")
const { uploadVideo, removeVideo } = require("../../services/video.service")
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
            const foto = req.files?.foto
            const video = req.files?.video
            languages.forEach(lang => {
                if (body?.[lang]) {
                    if(typeof body?.[lang] === 'string') body[lang] = JSON.parse(body[lang])
                    body.languages = body?.languages || []
                    body.languages.push({ ...body?.[lang], lang })
                }
            })
            if (foto) {
                const productFoto = await imageUpload({ image: foto, link: req.protocol + "://" + req.get("host") })
                if (productFoto?.url) body.foto = productFoto.url
                else throw new ExpressError('foto is not uploaded')
            }
            if(video) {
                const productVideo = await uploadVideo(video,  req.protocol + "://" + req.get("host"))
                body.video = productVideo?.url
            }
            const product = await Service.createProduct(body)
            if (product?.error) {
                if (foto && typeof body.foto === 'string') removeImage(body.foto)
                if (video && typeof body.video === 'string') removeVideo(body.video)
                throw new ExpressError(product.message)
            }
            res.status(201).json(product)
        } catch (error) {
            next(error)
        }
    }

    async updateProduct(req, res, next) {
        try {
            const body = req.body
            const foto = req.files?.foto
            const video = req.files?.video
            languages.forEach(lang => {
                if (body?.[lang]) {
                    if(typeof body?.[lang] === 'string') body[lang] = JSON.parse(body[lang])
                    body.languages = body?.languages || []
                    body.languages.push({ ...body?.[lang], lang })
                }
            })
            if (foto) {
                const productFoto = await imageUpload({ image: foto, link: req.protocol + "://" + req.get("host") })
                if (productFoto?.url) body.foto = productFoto.url
                else throw new ExpressError('foto is not uploaded')
            }
            if(video) {
                const productVideo = await uploadVideo(video, req.protocol + "://" + req.get("host"))
                body.video = productVideo?.url
            }
            const product = await Service.updateProduct(req.params?.id, req.body)
            if (product?.error) {
                if (foto && body.foto) removeImage(body.foto)
                if (video && typeof body.video === 'string') removeVideo(body.video)
                throw new ExpressError(product.message)
            }
            res.status(203).json(product)
        } catch (error) {
            next(error)
        }
    }

    async deleteProduct(req, res, next) {
        try {
            let product = await Service.getOne(req.params?.id)
            product = JSON.parse(JSON.stringify(product))
            if(product){
                if(product.foto) removeImage(product.foto)
                if(product.video) removeVideo(product.video)
                const deletedProduct = await Service.deleteProduct(req.params?.id)
                if (deletedProduct?.error) throw new ExpressError(deletedProduct.message)
                res.status(203).json(deletedProduct)
            } else {
                throw new ExpressError('Product not found')
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductController()