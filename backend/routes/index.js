const router = require('express').Router()

router.get('/status', (req, res) =>
  res.status(200).json({
    uptime: process.uptime(),
    build_version: process.env.BUILD_VERSION || 'missing build version',
    built_at: process.env.BUILT_AT || 'missing built at date',
  })
)

router.use('/states', require('./states'))
router.use('/jurisdictions', require('./jurisdictions'))
router.use('/locations', require('./locations'))
router.use('/user', require('./user'))
router.use('/admin', require('./admin'))

module.exports = router
