const router = require('express').Router()
const control = require('@controllers/user')
const auth = require('@middleware/auth')

router.get('/', auth(['volunteer', 'admin']), control.getUser)
router.post('/register', control.register)
router.post('/login', control.login)

module.exports = router
