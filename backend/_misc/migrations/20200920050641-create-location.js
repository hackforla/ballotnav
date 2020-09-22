'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      jurisdiction_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      location_name: {
        type: Sequelize.STRING,
      },
      location_info: {
        type: Sequelize.STRING,
      },
      address_1: {
        type: Sequelize.STRING,
      },
      address_2: {
        type: Sequelize.STRING,
      },
      address_3: {
        type: Sequelize.STRING,
      },
      contact_name: {
        type: Sequelize.STRING,
      },
      contact_email: {
        type: Sequelize.STRING,
      },
      contact_fax: {
        type: Sequelize.STRING,
      },
      contact_phone: {
        type: Sequelize.STRING,
      },
      internal_note: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.FLOAT,
      },
      longitude: {
        type: Sequelize.FLOAT,
      },
      is_early_dropoff_location: {
        type: Sequelize.BOOLEAN,
      },
      is_early_voting_location: {
        type: Sequelize.BOOLEAN,
      },
      is_elections_office: {
        type: Sequelize.BOOLEAN,
      },
      is_polling_location: {
        type: Sequelize.BOOLEAN,
      },
      scheduletype: {
        type: Sequelize.STRING,
      },
      is_drop_box: {
        type: Sequelize.BOOLEAN,
      },
      facilitytype_id: {
        type: Sequelize.INTEGER,
      },
      tempstring: {
        type: Sequelize.STRING,
      },
      timezone: {
        type: Sequelize.STRING,
      },
      continuous_open: {
        type: Sequelize.DATE,
      },
      continuous_close: {
        type: Sequelize.DATE,
      },
      schedule_description: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Locations')
  },
}
