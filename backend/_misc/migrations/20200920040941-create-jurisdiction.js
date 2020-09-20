'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Jurisdictions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      state_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      internal_contact_name: {
        type: Sequelize.STRING,
      },
      internal_contact_email: {
        type: Sequelize.STRING,
      },
      internal_contact_phone: {
        type: Sequelize.STRING,
      },
      internal_contact_fax: {
        type: Sequelize.STRING,
      },
      internal_notes: {
        type: Sequelize.STRING,
      },
      geojson: {
        type: Sequelize.JSON,
      },
      fips_category: {
        type: Sequelize.STRING,
      },
      fips_county_code: {
        type: Sequelize.STRING,
      },
      fips_stateandcounty_code: {
        type: Sequelize.STRING,
      },
      fips_county_sub_code: {
        type: Sequelize.STRING,
      },
      fips_place_code: {
        type: Sequelize.STRING,
      },
      fips_cons_city_code: {
        type: Sequelize.STRING,
      },
      authority_name: {
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
    await queryInterface.dropTable('Jurisdictions')
  },
}
