const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//// CONFIG ////

const TOKEN_SECRET = process.env.TOKEN_SECRET
const TOKEN_EXPIRY = Number(process.env.TOKEN_EXPIRY)
const SALT_ROUNDS = 10

//// HELPERS ////

async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

async function checkPassword(password, passwordHash) {
  return await bcrypt.compare(password, passwordHash)
}

async function createToken(claims) {
  return await jwt.sign(claims, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRY })
}

async function decodeToken(token) {
  const claims = await jwt.verify(token, TOKEN_SECRET)
  delete claims.iat
  return claims
}

//// EXPORTS ////

exports.getUser = async (req, res) => res.json(req.user)

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body

  const existingUser = await req.db.User.findOne({ where: { email } })
  if (existingUser) return res.json({ duplicateEmail: true })

  try {
    const passwordHash = await hashPassword(password)
    const user = await req.db.User.create({
      firstName,
      lastName,
      email,
      passwordHash,
    })
    delete user.passwordHash
    const token = await createToken({ user })
    return res.json({ isSuccess: true, token, user })
  } catch (e) {
    return res.status(400).send(e)
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  const user = await req.db.User.findOne({ where: { email } })
  if (!user) return res.json({ emailNotFound: true })

  const valid = await checkPassword(password, user.passwordHash)
  if (!valid) return res.json({ passwordInvalid: true })

  delete user.passwordHash
  const token = await createToken({ user })
  res.json({ isSuccess: true, token, user })
}

exports.decodeToken = decodeToken
