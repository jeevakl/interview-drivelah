const { ContactRequestModel } = require('./contactRequest.model')
const { Parser } = require('json2csv')

module.exports.list = function (req, res) {
  const query = {
  }

  return ContactRequestModel.find(query).then(contactRequests => {
    return res.api(
      200,
      'contactRequest.listed',
      {
        contactRequests
      }
    )
  })
}

module.exports.reset = function (req, res) {
  const query = {
  }

  return ContactRequestModel.deleteMany(query).then(() => {
    return res.api(
      200,
      'contactRequest.reset'
    )
  })
}

module.exports.create = function (req, res) {
  const { name, email, message } = req.body

  return ContactRequestModel.create(
    {
      name,
      email,
      message
    }
  )
    .then(contactRequest => {
      return res.api(
        200,
        'contactRequest.created',
        {
          contactRequest
        }
      )
    })
}

module.exports.download = function (req, res) {
  const query = {
  }

  return ContactRequestModel.find(query).then(contactRequests => {
    try {
      const parser = new Parser(
        {
          fields: [
            'name',
            'email',
            'message'
          ]
        }
      )
      const csv = parser.parse(contactRequests)
      if (csv) {
        res.setHeader('Content-disposition', 'attachment; filename=data.csv')
        res.set('Content-Type', 'text/csv')
        return res.send(csv)
      }
    } catch (e) {
      console.log(e)
      return res.api(
        500,
        'internalerror'
      )
    }
  })
}
