'use strict'

const db = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await db.sequelize.sync({ force: true })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropAllTables()
  },
}
