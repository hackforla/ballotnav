require('dotenv').config()

module.exports = {
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME || 'ballotnav_root',
  password: process.env.DB_PASSWORD || process.env.POSTGRES_PASSWORD,
  database: process.env.DB_DATABASE || 'ballotnav_db',
  dialect: 'postgresql',
}
