'use strict'

const fs = require('fs')
const initUpSql = fs.readFileSync(
  './migrations/sql/20200925163300-init-up.sql',
  { encoding: 'utf-8' }
)
const initDownSql = fs.readFileSync(
  './migrations/sql/20200925163300-init-down.sql',
  { encoding: 'utf-8' }
)
const db = require('../models')

module.exports = {
  up: () => db.sequelize.query(initUpSql),
  down: () => db.sequelize.query(initDownSql),
}
