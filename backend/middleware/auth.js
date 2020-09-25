const { decodeToken } = require('@controllers/user')

function auth(allowedRoles = []) {
  return async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) return res.status(401).send('auth token is required')
    try {
      const claims = await decodeToken(token)
      req.user = claims.user
    } catch {
      return res.status(401).send('token is invalid or expired')
    }

    if (allowedRoles.includes(req.user.role)) return next()
    else return res.status(403).send(`allowed roles: ${allowedRoles}`)
  }
}

module.exports = auth
