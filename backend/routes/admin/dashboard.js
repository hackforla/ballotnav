const router = require('express-promise-router')()
const control = require('@controllers/admin/dashboard')
const auth = require('@middleware/auth')

router.get('/jurisdictions', /* auth(['admin']), */ control.getJurisdictions)

module.exports = router
