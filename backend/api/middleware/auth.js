const logger = require('@log')

const { decodeToken } = require('@controllers/admin/user')

function auth(allowedRoles = []) {
  return async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) return res.status(401).send('auth token is required')
    try {
      const claims = await decodeToken(token)
      req.user = claims.user
    } catch {
      logger.error({
        message: 'Error decoding JWT',
        token: token,
      })
      return res
        .status(401)
        .send({ status: 'error', message: 'token is invalid or expired' })
    }

    if (allowedRoles.includes(req.user.role)) return next()
    else return res.status(403).send(`allowed roles: ${allowedRoles}`)
  }
}

module.exports = auth
