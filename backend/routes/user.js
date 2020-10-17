const { checkSchema } = require('express-validator')

const router = require('express').Router()
const control = require('@controllers/user')
const auth = require('@middleware/auth')
const schemas = require('@routes/schemas')

router.get('/', auth(['volunteer', 'admin']), control.getUser)
router.post('/register', control.register)
router.post('/login', control.login)

router.get('/volunteers', auth(['admin']), control.listVolunteers)

router.post(
  '/assignments',
  auth(['admin']),
  checkSchema(schemas.createAssignments),
  control.assign
)

module.exports = router
