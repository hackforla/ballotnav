const router = require('express').Router()
const control = require('@controllers/jurisdictions')
const authenticate = require('@middleware/authenticate')

router.get('/', control.list)
router.post('/', authenticate, control.create)

module.exports = router
