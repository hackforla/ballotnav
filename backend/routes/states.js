const router = require('express').Router()
const db = require('../models')

router.get('/', async (req, res) => {
  const data = await db.State.findAll()
  res.json(data)
})

module.exports = router
