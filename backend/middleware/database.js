const db = require('@models')

function database(req, res, next) {
  req.db = db
  next()
}

module.exports = database
