'use strict'

const faker = require('faker')
faker.seed(123)
const db = require('../models')

function generateLocation(jurisdictionId) {
  return {
    jurisdictionId: jurisdictionId,
    locationName: faker.address.city(),
    locationInfo: null,
    address1: faker.address.streetAddress(),
    address2: faker.address.secondaryAddress(),
    address3: null,
    contactName: faker.name.firstName() + ' ' + faker.name.lastName(),
    contactEmail: faker.internet.email(),
    contactFax: faker.phone.phoneNumberFormat(),
    contactPhone: faker.phone.phoneNumberFormat(),
    internalNote: null,
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    isEarlyDropoffLocation: faker.random.boolean(),
    isEarlyVotingLocation: faker.random.boolean(),
    isElectionsOffice: faker.random.boolean(),
    isPollingLocation: faker.random.boolean(),
    scheduletype: null,
    isDropBox: faker.random.boolean(),
    facilitytypeId: faker.random.number(),
    tempstring: null,
    timezone: null,
    continuousOpen: faker.date.future(),
    continuousClose: faker.date.future(),
    scheduleDescription: null,
    createdAt: new Date(),
    updatedAt: new Date(),
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

    await queryInterface.bulkInsert('Locations', records)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Locations', null, {})
  },
}
