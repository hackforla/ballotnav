const router = require('express-promise-router')()
const control = require('@controllers/admin/dashboard')
const auth = require('@middleware/auth')

router.get('/jurisdictions', /* auth(['admin']), */ control.getJurisdictions)
router.get('/gis/states', control.getGisStates)
router.get('/gis/states/:statefp/counties', control.getGisCounties)
router.post('/gis/countyByLonLat', control.getCountyByLonLat)

module.exports = router
