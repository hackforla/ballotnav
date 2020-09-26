const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logger = require('@log')

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
  return await jwt.verify(token, TOKEN_SECRET)
}

//// EXPORTS ////

exports.getUser = async (req, res) => res.json(req.user)

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body
  logger.info({
    message: 'register request',
    firstName: firstName,
    lastName: lastName,
    email: email,
  })

  const existingUser = await req.db.User.findOne({ where: { email } })
  if (existingUser) {
    logger.info({
      message: 'Received request to register an existing account',
      email: email,
      route: req.route.path,
    })
    return res.json({ duplicateEmail: true })
  }

  try {
    const passwordHash = await hashPassword(password)
    const user = await req.db.User.create({
      firstName,
      lastName,
      email,
      passwordHash,
      role: 'volunteer',
    })
    delete user.passwordHash
    const token = await createToken({ user })
    return res.json({ isSuccess: true, token, user })
  } catch (e) {
    logger.error({
      message: 'Error registering account',
      err: e,
      email: email,
      route: req.route.path,
    })
    return res.status(400).send(e)
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  const user = await req.db.User.findOne({ where: { email } })
  if (!user) {
    logger.info({
      message: 'User login not found',
      email: email,
      route: req.route.path,
    })
    return res.status(401).json({ emailNotFound: true })
  }

  const valid = await checkPassword(password, user.passwordHash)
  if (!valid) {
    logger.info({
      message: 'User login attempt invalid password',
      email: email,
      route: req.route.path,
    })
    return res.status(401).json({ passwordInvalid: true })
  }

  delete user.passwordHash
  const token = await createToken({ user })
  logger.info({
    message: 'Login success',
    email: email,
    userId: user.id,
    route: res.route.path,
  })
  res.json({ isSuccess: true, token, user })
}

exports.decodeToken = decodeToken
