const { checkSchema } = require('express-validator')

const router = require('express').Router()
const control = require('@controllers/jurisdictions')
const auth = require('@middleware/auth')
const schemas = require('./schemas')

router.get('/', control.list)
router.post('/', auth(['volunteer', 'admin']), control.create)
router.delete('/', auth(['admin']), control.delete)

router.post('/assign', control.assign) // TODO: control access
router.get('/me', auth(['volunteer', 'admin']), control.listMine)

router.get('/wip', auth(['volunteer', 'admin']), control.listWip)
router.post('/wip', auth(['volunteer', 'admin']), control.createWip)
router.put(
  '/wip/:wipJurisdictionId',
  auth(['volunteer', 'admin']),
  control.updateWip
)

router.get(
  '/wip/:wipJurisdictionId/locations',
  auth(['volunteer', 'admin']),
  checkSchema(schemas.wipJurisdictionId),
  control.listWipJurisdictionsWipLocation
)

module.exports = router
