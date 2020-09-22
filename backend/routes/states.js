const router = require('express').Router()
const db = require('@models')

router.get('/', async (req, res) => {
  const data = await db.State.findAll()
  res.json(data)
})

router.post('/', (req, res, next) => {
  db.State.create(req.body)
    .then((data) => res.json(data))
    .catch(next)
})

module.exports = router
