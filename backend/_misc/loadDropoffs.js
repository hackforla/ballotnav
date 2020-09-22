const faker = require('faker')
const db = require('../models')

faker.seed(123)
const NUM_RECORDS = 500

function randomDropoff() {
  return {
    state_name: faker.address.state(),
    state_short_code: faker.address.stateAbbr(),
    county: faker.address.county(),
    position: faker.name.jobTitle(),
    contact_name: faker.name.firstName() + ' ' + faker.name.lastName(),
    address_1: faker.address.streetAddress(),
    address_2: faker.address.secondaryAddress(),
    email: faker.internet.email(),
    fax: faker.phone.phoneNumberFormat(),
    phone: faker.phone.phoneNumberFormat(),
    county_website: faker.internet.url(),
    source_url: faker.internet.url(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
  }
}

function loadDropoffs() {
  const dropoffs = Array.from({ length: NUM_RECORDS }).map(randomDropoff)
  return db.Dropoffs.bulkCreate(dropoffs)
}

module.exports = loadDropoffs
