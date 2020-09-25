const fs = require('fs');

module.exports = {
  development: {
    username: 'ballotnav',
    password: 'pgpass',
    database: 'main',
    host: 'db',
    dialect: 'postgresql'
  },
  test: {
    username: 'database_test',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'ballotnav',
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB || 'main',
    host: process.env.DB_HOSTNAME,
    dialect: 'postgresql'
  }
};

