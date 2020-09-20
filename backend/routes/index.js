const router = require('express').Router()

router.use('/states', require('./states'))
router.use('/jurisdictions', require('./jurisdictions'))
router.use('/locations', require('./locations'))

module.exports = router;
