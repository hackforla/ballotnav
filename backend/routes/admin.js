const router = require('express').Router()
const control = require('@controllers/admin')

router.get('/instances/*', control.listInstances)
router.get('/instance/*', control.getInstance)

module.exports = router
