const router = require('express').Router()
const control = require('@controllers/public')

router.post('/jurisdictions', control.getJurisdictionsFromLatLon)

module.exports = router;
