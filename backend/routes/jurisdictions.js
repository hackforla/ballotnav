const router = require('express').Router()
const control = require('@controllers/jurisdictions')
const auth = require('@middleware/auth')

router.get('/', control.list)
router.post('/', auth(['volunteer', 'admin']), control.create)
router.delete('/', auth(['admin']), control.delete)

module.exports = router
