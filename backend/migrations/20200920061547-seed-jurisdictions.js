'use strict'

const faker = require('faker')
faker.seed(123)
const db = require('../models')

function generateJurisdiction(stateId) {
  return {
    stateId: stateId,
    name: faker.address.county(),
    email: faker.internet.email(),
    internalContactName: faker.name.firstName() + ' ' + faker.name.lastName(),
    internalContactEmail: faker.internet.email(),
    internalContactPhone: faker.phone.phoneNumberFormat(),
    internalContactFax: faker.phone.phoneNumberFormat(),
    internalNotes: '',
    geojson: null,
    fipsCategory: '',
    fipsCountyCode: faker.random.number(),
    fipsStateAndCountyCode: faker.random.number(),
    fipsCountySubCode: faker.random.number(),
    fipsPlaceCode: faker.random.number(),
    fipsConsCityCode: faker.random.number(),
    authorityName: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const states = await db.State.findAll()
    const stateIds = states.map((state) => state.id)

    const records = []
    stateIds.forEach((stateId) => {
      records.push(generateJurisdiction(stateId))
      records.push(generateJurisdiction(stateId))
      records.push(generateJurisdiction(stateId))
    })

    await queryInterface.bulkInsert('Jurisdictions', records)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Jurisdictions', null, {})
  },
}
