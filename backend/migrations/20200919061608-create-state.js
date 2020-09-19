'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('states', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      abbreviation: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },

      authority_name: {
        type: Sequelize.STRING
      },

      fax: {
        type: Sequelize.STRING
      },

      fips_code: {
        type: Sequelize.STRING
      },

      geojson: {
        type: Sequelize.JSON
      },

      late_registration_possible: {
        type: Sequelize.BOOLEAN
      },

      phone: {
        type: Sequelize.STRING
      },

      website: {
        type: Sequelize.STRING
      },

      website_voter_registration: {
        type: Sequelize.STRING
      },

      website_ballot_check: {
        type: Sequelize.STRING
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('states');
  }
};
