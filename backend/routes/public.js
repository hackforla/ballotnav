const router = require('express-promise-router')()
const control = require('@controllers/public')

router.get('/jurisdictions', control.getJurisdictionsFromLatLon)
router.get('/states', control.listStates)
router.get('/states/:stateId', control.getState)
router.get('/states/:stateId/jurisdictions', control.listJurisdictionsInState)
router.get('/jurisdictions/:jurisdictionId', control.getJurisdiction)

module.exports = router
