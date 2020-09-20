const router = require('express').Router()
const db = require('@models')

router.get('/', async (req, res) => {
  const data = await db.Jurisdiction.findAll()
  res.json(data)
})

router.post('/', (req, res, next) => {
  db.Jurisdiction.create(req.body)
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router
