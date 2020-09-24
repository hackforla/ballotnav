const router = require('express').Router()

router.get('/status', (req, res) => res.send(`ok at ${new Date()}`))

router.use('/states', require('./states'))
router.use('/jurisdictions', require('./jurisdictions'))
router.use('/locations', require('./locations'))
router.use('/user', require('./user'))

module.exports = router
