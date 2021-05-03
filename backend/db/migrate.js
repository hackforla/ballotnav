const Umzug = require('umzug')
const path = require('path')
const sequelize = require('./sequelize')

async function migrate() {
  if (process.env.DB_AUTO_MIGRATE !== '1') return null

  console.log('EXECUTING MIGRATIONS')

  const umzug = new Umzug({
    migrations: {
      path: path.join(__dirname, './migrations'),
      params: [sequelize.getQueryInterface()],
    },
    storage: 'sequelize',
    storageOptions: {
      sequelize,
      modelName: sequelize.options.migrationStorageTableName,
    },
  })

  return await umzug.up()
}

module.exports = migrate
