const { Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logger = require('@log')
const { handleError } = require('@controllers/error')

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
  let t = token.replace(/^Bearer /i, '')
  return await jwt.verify(t, TOKEN_SECRET)
}

//// EXPORTS ////

exports.getUser = async (req, res) => res.json(req.user)

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password, notes, slackName } = req.body
  logger.info({
    message: 'register request',
    firstName: firstName,
    lastName: lastName,
    email: email,
    notes,
    slackName,
  })

  const existingUser = await req.db.User.findOne({ where: { email } })
  if (existingUser) {
    logger.info({
      message: 'Received request to register an existing account',
      email: email,
      route: req.route.path,
    })
    return res.status(400).json({ duplicateEmail: true })
  }

  try {
    const passwordHash = await hashPassword(password)
    const user = await req.db.User.create({
      firstName,
      lastName,
      email,
      passwordHash,
      role: 'volunteer',
      notes,
      slackName,
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
    return res.status(400).json({ unknownError: true })
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
    route: req.route.path,
  })
  res.json({ isSuccess: true, token, user })
}

exports.listVolunteers = async (req, res) => {
  try {
    const data = await req.db.User.findAll({
      attributes: [
        'id',
        ['first_name', 'firstName'],
        ['last_name', 'lastName'],
        'email',
        'notes',
        ['slack_name', 'slackName'],
      ],
      where: {
        role: 'volunteer',
      },
      include: {
        model: req.db.UserJurisdiction,
        as: 'userJurisdictions',
        include: {
          model: req.db.Jurisdiction,
          as: 'jurisdiction',
        },
      },
    })
    res.json(data);
  } catch (err) {
    return handleError(err, 500, res)
  }
}

/**
 * create a user assignment to a jurisdiction
 */

// TODO: handle bulk deletion of removed jurisdiction assignments
exports.assign = async (req, res) => {
  let jurisdictionIds = [...req.body.jurisdictionIds]
  let userId = req.body.userId
  let adminUserId = req.user.id

  logger.info({
    message: 'Creating user jurisdiction',
    route: req.route.path,
    adminUserId,
    jurisdictionIds,
    userId,
  })

  try {
    let jurisdictionAssignmentAlreadyExists = await req.db.UserJurisdiction.findOne(
      {
        where: {
          userId: userId,
          jurisdictionId: {
            [Sequelize.Op.in]: jurisdictionIds,
          },
        },
      }
    )
    if (jurisdictionAssignmentAlreadyExists !== null) {
      return handleError(
        { statusMessage: 'Error: assignment exists' },
        400,
        res
      )
    }
    let records = jurisdictionIds.map((jid) => ({
      ...req.body,
      userId: userId,
      jurisdictionId: jid,
      status: 'editor',
    }))
    let results = await req.db.UserJurisdiction.bulkCreate(records)
    logger.info({
      message: 'Success: created user jurisdiction',
      route: req.route.path,
      adminUserId,
      jurisdictionIds,
      userId,
      count: records.length,
    })
    return res.status(201).json({ status: 'ok', results: results })
  } catch (err) {
    return handleError(err, 400, res)
  }
}

exports.decodeToken = decodeToken
