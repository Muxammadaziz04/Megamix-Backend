const routes = [
    require('./admin.router.js'),
    require('./partners.router.js'),
    require('./ProductCategories.router')
]

const combineRoutes = (app) => {
    routes.forEach(route => {
        app.use(route)
    })
}

module.exports = combineRoutes