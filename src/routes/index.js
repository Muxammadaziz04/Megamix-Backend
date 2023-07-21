const routes = [
    require('./admin.router.js'),
    require('./partners.router.js'),
    require('./ProductCategories.router.js'),
    require('./product.router.js'),
    require('./feedback.router.js'),
    require('./news.router.js'),
    require('./journal.router.js'),
    require('./slider.router.js'),
]

const combineRoutes = (app) => {
    routes.forEach(route => {
        app.use(route)
    })
}

module.exports = combineRoutes