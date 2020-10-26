const router = require('express-promise-router')()
const control = require('@controllers/admin/wip')
const auth = require('@middleware/auth')

router.get(
  '/jurisdictions/released',
  auth(['admin']),
  control.listReleasedJurisdictions
)
router.get(
  '/jurisdictions/released/:wipJurisdictionId',
  auth(['admin']),
  control.getReleasedJurisdiction
)
router.get(
  '/jurisdictions/:jurisdictionId',
  auth(['volunteer']),
  control.getWipJurisdiction
)
router.put(
  '/jurisdictions/:wipJurisdictionId',
  auth(['volunteer', 'admin']),
  control.updateWipJurisdiction
)
router.put(
  '/jurisdictions/:wipJurisdictionId/release',
  auth(['volunteer']),
  control.releaseWipJurisdiction
)
router.put(
  '/jurisdictions/:wipJurisdictionId/publish',
  auth(['admin']),
  control.publishWipJurisdiction
)

module.exports = router
