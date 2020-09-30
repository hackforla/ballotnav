const router = require('express').Router()
const control = require('@controllers/admin')

router.get('/instances/*', control.listInstances)
router.get('/instance/:modelName/:instanceId', control.getInstance)

module.exports = router
