require('module-alias/register')

const db = require('./db')
const api = require('./api')

async function run() {
  console.log('ENVIRONMENT: ', process.env)
  await db.connect()
  await db.migrate()
  api.start(db)
}

run()
