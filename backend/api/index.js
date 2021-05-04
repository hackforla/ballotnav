const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const database = require('./middleware/database')
const errorHandler = require('./middleware/errorHandler')

const PORT = process.env.PORT || 8080

function start(db) {
  const app = express()

  app.use(express.json({ limit: '10mb' }))
  app.use(cors())
  app.use(database(db))
  app.use(routes)
  app.use(errorHandler)

  app.listen(PORT, () => console.log(`App listening on port ${PORT}.`))
}

module.exports = { start }
