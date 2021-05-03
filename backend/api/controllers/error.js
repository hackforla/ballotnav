/**
 * error methods
 */
const logger = require('@log')

/**
 * handleError -
 * @params - err: Exception
 * @params - msg: String
 * @params - errCode: Number
 * @returns - Response
 */
exports.handleError = (err, errCode = 400, res) => {
  logger.error({
    message: err.message,
    err: err,
  })
  return res.status(errCode).send({
    status: 'error',
    message: err.statusMessage || err.message || 'Error',
  })
}
