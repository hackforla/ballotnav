'use strict';

const faker = require('faker')
faker.seed(123)
const db = require('../models')

function generateJurisdiction(stateId) {
  return {
    state_id: stateId,
    name: faker.address.county(),
    email: faker.internet.email(),
    internal_contact_name: faker.name.firstName() + ' ' + faker.name.lastName(),
    internal_contact_email: faker.internet.email(),
    internal_contact_phone: faker.phone.phoneNumberFormat(),
    internal_contact_fax: faker.phone.phoneNumberFormat(),
    internal_notes: '',
    geojson: null,
    fips_category: '',
    fips_county_code: faker.random.number(),
    fips_stateandcounty_code: faker.random.number(),
    fips_county_sub_code: faker.random.number(),
    fips_place_code: faker.random.number(),
    fips_cons_city_code: faker.random.number(),
    authority_name: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const states = await db.State.findAll()
    const stateIds = states.map(state => state.id)

    const records = []
    stateIds.forEach(stateId => {
      records.push(generateJurisdiction(stateId))
      records.push(generateJurisdiction(stateId))
      records.push(generateJurisdiction(stateId))
    })

    await queryInterface.bulkInsert('Jurisdictions', records)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Jurisdictions', null, {})
  }
};
