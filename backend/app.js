require('module-alias/register')

const express = require('express')
const cors = require('cors')
const routes = require('@routes')
const errorHandler = require('@middleware/errorHandler')

const PORT = 8080

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
