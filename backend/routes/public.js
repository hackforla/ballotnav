const router = require('express').Router()
const control = require('@controllers/public')

router.post('/latlon', control.getJurisdictionsFromLatLon);

module.exports = router;