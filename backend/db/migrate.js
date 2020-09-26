const Umzug = require('umzug')
const path = require('path')
const db = require('@models')

async function migrate() {
  if (process.env.DISABLE_DB_MIGRATION_AUTO_RUN) return null

  console.log('EXECUTING MIGRATIONS')

  const umzug = new Umzug({
    migrations: {
      path: path.join(__dirname, '../migrations'),
      params: [db.sequelize.getQueryInterface()],
    },
    storage: 'sequelize',
    storageOptions: {
      sequelize: db.sequelize,
      modelName: db.sequelize.options.migrationStorageTableName,
    },
  })

  return await umzug.up()
}

module.exports = migrate
