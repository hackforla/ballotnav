require('module-alias/register')
const fs = require('fs')

module.exports = {
  development: {
    username: 'ballotnav',
    password: 'pgpass',
    database: 'main',
    host: 'db',
    dialect: 'postgresql',
    migrationStorageTableName: 'sequelize_meta',
  },
  test: {
    username: 'database_test',
    password: 'pgpass',
    database: 'database_test',
    host: 'db',
    dialect: 'postgresql',
  },
  production: {
    username: process.env.POSTGRES_USER || 'ballotnav',
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB || 'main',
    host: process.env.DB_HOSTNAME,
    dialect: 'postgresql',
    migrationStorageTableName: 'sequelize_meta',
    port: process.env.DB_PORT || 5432,
  },
}
