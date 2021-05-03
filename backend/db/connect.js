const sequelize = require('./sequelize')

async function connect() {
  try {
    await sequelize.authenticate({ logging: false })
    console.log('Connected to database.')
  } catch(e) {
    console.log('DB CONNECTION ERROR:', e.message)
    process.exit(0)
  }
}

module.exports = connect
