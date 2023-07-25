const cors = require('cors')
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const { PORT } = require('./constants/server.constants')
const combineRoutes = require('./routes')
const { connectToDB } = require('./services/sequelize.service')

const app = express()

connectToDB()

app.use(cors({ origin: 'https://admin.megamix.getter.uz', credentials: true }));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../uploads')))
app.use(fileUpload({
	tempFileDir: "temp",
	useTempFiles: true,
}))

combineRoutes(app)

app.use((err, req, res, next) => {
    res.status(err.status || 400).send({
        error: true,
        status: err?.status || 400,
        message: err?.message || 'Somethink went wrong',
    })
})

app.listen(PORT, () => console.log(`Server is run on ${PORT} port`))
