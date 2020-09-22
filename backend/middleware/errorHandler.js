const db = require('@models')

function errorHandler(err, req, res, next) {
  if (
    err instanceof db.Sequelize.ValidationError ||
    err instanceof db.Sequelize.AggregateError
  )
    res.status(400).send(err)
  else res.status(500).send(err.message)
}

module.exports = errorHandler
