const router = require('express').Router()
const control = require('@controllers/admin')

router.get('/instances/*', control.listInstances)
router.get('/instance/*', control.getInstance)
router.get('/jurisdictions/me', control.listMyJurisdictions)
router.get('/jurisdictions/:id', control.getJurisdiction)
router.get('/jurisdictions', control.listJurisdictions)
router.get('/states', control.listStates)
router.get('/states/:id', control.getState)

module.exports = router
