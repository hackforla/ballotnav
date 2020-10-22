const router = require('express-promise-router')()
const control = require('@controllers/assignment')
const auth = require('@middleware/auth')

router.post(
  '/jurisdictions',
  auth(['admin']),
  control.assignJurisdictions,
)
router.get(
  '/jurisdictions',
  auth(['admin']),
  control.listJurisdictions,
)
router.get(
  '/volunteers',
  auth(['admin']),
  control.listVolunteers,
)
router.get(
  '/jurisdictions/me',
  auth(['volunteer']),
  control.listMyJurisdictions,
)

module.exports = router
