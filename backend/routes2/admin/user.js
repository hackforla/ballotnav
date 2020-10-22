const router = require('express-promise-router')()
const control = require('@controllers/admin/user')
const auth = require('@middleware/auth')
const validate = require('@middleware/validate')

router.get('/me', auth(['volunteer', 'admin']), control.getUser)
router.post('/register', control.register)
router.post('/login', control.login)

router.post(
  '/test',
  validate({
    id: {
      in: ['query'],
      errorMessage: 'id required',
      isInt: true,
    }
  }),
  async (req, res) => res.json({ test: 'how' })
)

module.exports = router
