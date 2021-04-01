const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')

const { apiResponse } = require('./middlewares/apiResponse.middleware')
const { contactRequestRouter } = require('./contactRequest/contactRequest.router')

const { WHITELIST } = process.env

const app = express()

app.use(cors({
  origin: WHITELIST ? WHITELIST.split(',') : '*'
}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }))

app.use(apiResponse)

const router = express.Router()
router.use('/api', contactRequestRouter)
app.use(router)

app.use(express.static(path.resolve(__dirname, '../../client/dist/')))
app.use('/', function (req, res) {
  const file = path.resolve(__dirname, '../../client/dist/index.html')

  res.sendFile(file)
})

module.exports.app = app
