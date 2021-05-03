// output the config in the format required by the sequelize-cli
// https://sequelize.org/v4/manual/tutorial/migrations.html#configuration

const connect = require('./connect')

const config = {
  ...connect,
  migrationStorageTableName: 'sequelize_meta',
}

module.exports = {
  development: config,
  test: config,
  production: config,
}
