const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { PORT } = require('./constants/server.constants')
const combineRoutes = require('./routes')
const { connectToDB } = require('./services/sequelize.service')

const app = express()

connectToDB()

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

combineRoutes(app)

app.use((err, req, res, next) => {
    res.status(err.status || 400).send({
        error: true,
        status: err?.status || 400,
        message: err?.message || 'Somethink went wrong',
    })
})

app.listen(PORT, () => console.log(`Server is run on ${PORT} port`))