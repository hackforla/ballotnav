const router = require('express').Router()
const db = require('../models')

router.get('/', async (req, res) => {
  const states = await db.Locatiion.findAll()
  res.json(states)
})

module.exports = router
