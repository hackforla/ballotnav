const router = require('express-promise-router')()

router.get('/status', (req, res) =>
  res.status(200).json({
    uptime: process.uptime(),
    build_version: process.env.BUILD_VERSION || 'missing build version',
    built_at: process.env.BUILT_AT || 'missing built at date',
  })
)

router.use('/public', require('./public'))
router.use('/admin', require('./admin'))

module.exports = router
