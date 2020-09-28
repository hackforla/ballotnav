const router = require('express').Router()
const control = require('@controllers/jurisdictions')
const auth = require('@middleware/auth')

router.get('/', control.list)
router.post('/', auth(['volunteer', 'admin']), control.create)
router.delete('/', auth(['admin']), control.delete)

router.get('/wip', control.listWip)
router.post('/wip', auth(['volunteer', 'admin']), control.createWip)
router.put(
  '/wip/:wipJurisdictionId',
  auth(['volunteer', 'admin']),
  control.updateWip
)

router.get(
  '/wip/:wipJurisdictionId/locations',
  control.listWipJurisdictionsWipLocation
)

module.exports = router
