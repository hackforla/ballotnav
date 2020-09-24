const router = require('express').Router()
const control = require('@controllers/user')
const authenticate = require('@middleware/authenticate')

router.get('/', authenticate, control.getUser)
router.post('/register', control.register)
router.post('/login', control.login)

module.exports = router
