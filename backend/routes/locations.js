const { checkSchema } = require('express-validator')

const router = require('express').Router()
const control = require('@controllers/locations')
const auth = require('@middleware/auth')
const schemas = require('./schemas')

/*
 * published locations data
 */
router.get('/', control.list)
router.post('/', auth(['volunteer', 'admin']), control.create)
router.delete('/', auth(['admin']), control.delete)

/*
 * wip locations data
 */
router.get(
  '/:wipJurisdictionId/wip',
  auth(['volunteer', 'admin']),
  checkSchema(schemas.wipLocation),
  control.listWip
)
router.post(
  '/:wipJurisdictionId/wip',
  auth(['volunteer', 'admin']),
  checkSchema(schemas.wipLocationCreate),
  control.createWip
)
router.put(
  '/:wipJurisdictionId/wip/:wipLocationId',
  auth(['volunteer', 'admin']),
  checkSchema(schemas.wipLocationUpdate),
  control.updateWip
)
// router.delete('/', auth(['admin']), control.delete)

module.exports = router
