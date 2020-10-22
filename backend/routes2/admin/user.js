const router = require('express-promise-router')()
const control = require('@controllers/admin/user')
const auth = require('@middleware/auth')
const validate = require('@middleware/validate')

const schemas = {
  register: {
    firstName: {
      in: ['body'],
      notEmpty: true,
    },
    lastName: {
      in: ['body'],
      notEmpty: true,
    },
    email: {
      in: ['body'],
      isEmail: true,
    },
    password: {
      in: ['body'],
      isLength: { options: { min: 8 } },
    },
    notes: {
      in: ['body'],
      optional: true,
    },
    slackName: {
      in: ['body'],
      optional: true,
    },
  },
  login: {
    email: {
      in: ['body'],
      isEmail: true,
    },
    password: {
      in: ['body'],
      isLength: { options: { min: 8 } },
    },
  },
}

router.get('/me', auth(['volunteer', 'admin']), control.getUser)
router.post('/register', validate(schemas.register), control.register)
router.post('/login', validate(schemas.login), control.login)

module.exports = router
