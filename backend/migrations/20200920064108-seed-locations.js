'use strict'

const faker = require('faker')
faker.seed(123)
const db = require('../models')

function generateLocation(jurisdictionId) {
  return {
    jurisdiction_id: jurisdictionId,
    location_name: faker.address.city(),
    location_info: null,
    address_1: faker.address.streetAddress(),
    address_2: faker.address.secondaryAddress(),
    address_3: null,
    contact_name: faker.name.firstName() + ' ' + faker.name.lastName(),
    contact_email: faker.internet.email(),
    contact_fax: faker.phone.phoneNumberFormat(),
    contact_phone: faker.phone.phoneNumberFormat(),
    internal_note: null,
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    is_early_dropoff_location: faker.random.boolean(),
    is_early_voting_location: faker.random.boolean(),
    is_elections_office: faker.random.boolean(),
    is_polling_location: faker.random.boolean(),
    scheduletype: null,
    is_drop_box: faker.random.boolean(),
    facilitytype_id: faker.random.number(),
    tempstring: null,
    timezone: null,
    continuous_open: faker.date.future(),
    continuous_close: faker.date.future(),
    schedule_description: null,
    created_at: new Date(),
    updated_at: new Date(),
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const jurisdictions = await db.Jurisdiction.findAll()
    const jurisdictionIds = jurisdictions.map((jurisdiction) => jurisdiction.id)

    const records = []
    jurisdictionIds.forEach((jurisdictionId) => {
      records.push(generateLocation(jurisdictionId))
      records.push(generateLocation(jurisdictionId))
      records.push(generateLocation(jurisdictionId))
    })

    await queryInterface.bulkInsert('locations', records)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('locations', null, {})
  },
}
