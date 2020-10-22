const router = require('express-promise-router')()
const control = require('@controllers/admin/assignment')
const auth = require('@middleware/auth')
const validate = require('@middleware/validate')

const schemas = {
  assign: {
    userId: {
      in: ['body'],
      isInt: true,
    },
    jurisdictionIds: {
      in: ['body'],
      isArray: true,
    },
    removedJurisdictionIds: {
      in: ['body'],
      isArray: true,
    },
  },
}

router.post(
  '/jurisdictions',
  auth(['admin']),
  validate(schemas.assign),
  control.assignJurisdictions
)
router.get('/jurisdictions', auth(['admin']), control.listJurisdictions)
router.get('/volunteers', auth(['admin']), control.listVolunteers)
router.get(
  '/jurisdictions/me',
  auth(['volunteer']),
  control.listMyJurisdictions
)

module.exports = router
