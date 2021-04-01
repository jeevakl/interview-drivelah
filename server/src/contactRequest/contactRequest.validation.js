const { body } = require('express-validator')

module.exports.name = body('name')
  .exists().withMessage('validation.name.required')
  .bail()
  .trim()

module.exports.email = body('email')
  .exists().withMessage('validation.email.required')
  .isEmail().withMessage('validation.email.isEmail')
  .bail()
  .trim()
