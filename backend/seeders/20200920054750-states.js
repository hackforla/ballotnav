'use strict';

const faker = require('faker')
faker.seed(123)

const STATES = {
  "AL": "Alabama",
  "AK": "Alaska",
  "AS": "American Samoa",
  "AZ": "Arizona",
  "AR": "Arkansas",
  "CA": "California",
  "CO": "Colorado",
  "CT": "Connecticut",
  "DE": "Delaware",
  "DC": "District Of Columbia",
  "FM": "Federated States Of Micronesia",
  "FL": "Florida",
  "GA": "Georgia",
  "GU": "Guam",
  "HI": "Hawaii",
  "ID": "Idaho",
  "IL": "Illinois",
  "IN": "Indiana",
  "IA": "Iowa",
  "KS": "Kansas",
  "KY": "Kentucky",
  "LA": "Louisiana",
  "ME": "Maine",
  "MH": "Marshall Islands",
  "MD": "Maryland",
  "MA": "Massachusetts",
  "MI": "Michigan",
  "MN": "Minnesota",
  "MS": "Mississippi",
  "MO": "Missouri",
  "MT": "Montana",
  "NE": "Nebraska",
  "NV": "Nevada",
  "NH": "New Hampshire",
  "NJ": "New Jersey",
  "NM": "New Mexico",
  "NY": "New York",
  "NC": "North Carolina",
  "ND": "North Dakota",
  "MP": "Northern Mariana Islands",
  "OH": "Ohio",
  "OK": "Oklahoma",
  "OR": "Oregon",
  "PW": "Palau",
  "PA": "Pennsylvania",
  "PR": "Puerto Rico",
  "RI": "Rhode Island",
  "SC": "South Carolina",
  "SD": "South Dakota",
  "TN": "Tennessee",
  "TX": "Texas",
  "UT": "Utah",
  "VT": "Vermont",
  "VI": "Virgin Islands",
  "VA": "Virginia",
  "WA": "Washington",
  "WV": "West Virginia",
  "WI": "Wisconsin",
  "WY": "Wyoming"
}

function generateState(abbr) {
  const state = STATES[abbr]
  return {
    abbreviation: abbr,
    name: state,
    authority_name: '',
    fax: faker.phone.phoneNumberFormat(),
    fips_code: faker.address.zipCodeByState(state),
    geojson: null,
    late_registration_possible: true,
    phone: faker.phone.phoneNumberFormat(),
    website: faker.internet.url(),
    website_voter_registration: faker.internet.url(),
    website_ballot_check: faker.internet.url(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const records = Object.keys(STATES).map(generateState)
    await queryInterface.bulkInsert('states', records)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('states', null, {})
  }
};
