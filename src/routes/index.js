const AdminRouter = require('./admin.router.js')

const routes = [
    AdminRouter
]

const combineRoutes = (app) => {
    routes.forEach(route => {
        app.use(route)
    })
}

module.exports = combineRoutes