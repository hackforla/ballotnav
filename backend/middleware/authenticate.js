const { decodeToken } = require('@controllers/user')

async function authenticate(req, res, next) {
  const token = req.headers.authorization
  if (!token) return res.status(401).send('auth token is required.')
  try {
    req.user = await decodeToken(token)
    return next()
  } catch {
    return res.status(401).send('invalid token')
  }
}

module.exports = authenticate
