const router = require('express').Router()
const control = require('@controllers/admin')

router.get('/jurisdictions', control.listJurisdictions)
router.get('/jurisdictions/me', control.listMyJurisdictions)
router.get('/jurisdictions/:id', control.getJurisdiction)
router.get('/states', control.listStates)
router.get('/states/:id', control.getState)

module.exports = router
