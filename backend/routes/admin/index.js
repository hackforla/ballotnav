const router = require('express-promise-router')()

router.use('/user', require('./user'))
router.use('/assignment', require('./assignment'))
router.use('/wip', require('./wip'))

module.exports = router
