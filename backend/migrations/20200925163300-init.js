'use strict'

const fs = require("fs");
const init_up_sql = fs.readFileSync("./migrations/sql/20200925163300-init-up.sql", {encoding: "utf-8",});
const init_down_sql = fs.readFileSync("./migrations/sql/20200925163300-init-down.sql", {encoding: "utf-8",});
const db = require('../models')

module.exports = {
  up: () => db.sequelize.query(init_up_sql),
  down: () => db.sequelize.query(init_down_sql),
}
