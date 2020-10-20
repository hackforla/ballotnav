const router = require('express-promise-router')()
const control = require('@controllers/admin')
const auth = require('@middleware/auth')

router.get('/jurisdictions',
  auth(['admin']),
  control.listJurisdictions,
)
router.get(
  '/jurisdictions/me',
  auth(['volunteer', 'admin']),
  control.listMyJurisdictions
)
router.get('/jurisdictions/:id', control.getJurisdiction)
router.post(
  '/jurisdictions/assign',
  auth(['admin']),
  control.assignJurisdictions,
)

router.get('/states', control.listStates)
router.get('/states/:id', control.getState)

router.get(
  '/wip/jurisdictions/released',
  auth(['admin']),
  control.listReleasedJurisdictions
)
router.get(
  '/wip/jurisdictions/released/:wipJurisdictionId',
  auth(['admin']),
  control.getReleasedJurisdiction
)
router.get(
  '/wip/jurisdictions/:jurisdictionId',
  auth(['volunteer', 'admin']),
  control.getWipJurisdiction
)
router.put(
  '/wip/jurisdictions/:wipJurisdictionId',
  auth(['volunteer', 'admin']),
  control.updateWipJurisdiction
)
router.put(
  '/wip/jurisdictions/:wipJurisdictionId/release',
  auth(['volunteer', 'admin']),
  control.releaseWipJurisdiction
)
router.put(
  '/wip/jurisdictions/:wipJurisdictionId/publish',
  auth(['admin']),
  control.publishWipJurisdiction
)

module.exports = router
