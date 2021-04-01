const { Schema, model } = require('mongoose')

const ContactRequestSchema = new Schema({
  name: String,
  email: String,
  message: String
}, {
  timestamps: true
})

module.exports.ContactRequestModel = model('contactRequests', ContactRequestSchema)
