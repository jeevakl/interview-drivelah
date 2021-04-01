const express = require('express')
const { list, create, download, reset } = require('./contactRequest.controller')
const { name, email } = require('./contactRequest.validation')
const { validate } = require('../middlewares/validate.middleware')

const router = express.Router()

router.get('/contact-request', validate, list)
router.get('/contact-request/download', validate, download)
router.get('/contact-request/reset', validate, reset)
router.post('/contact-request', [name, email], validate, create)

module.exports.contactRequestRouter = router
