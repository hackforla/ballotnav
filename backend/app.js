require('module-alias/register')
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const routes = require('@routes')
const database = require('@middleware/database')
const errorHandler = require('@middleware/errorHandler')
const db = require('@models')
const migrate = require('./db/migrate')

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(cors())
app.use(database)
app.use(routes)
app.use(errorHandler)

migrate().then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
})
