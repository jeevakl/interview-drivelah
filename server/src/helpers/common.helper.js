const util = require('util')
const { URL } = process.env

const urls = {
}

module.exports.url = function (name, ...params) {
  const url = URL + urls[name]
  return util.format(url, ...params)
}
