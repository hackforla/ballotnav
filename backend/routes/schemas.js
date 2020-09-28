/**
 * request model schemas
 */

module.exports = {
  wipJurisdictionId: {
    wipJurisdictionId: {
      in: ['params'],
      errorMessage: 'Missing wip jurisdiction id',
      isInt: true,
      toInt: true,
    },
  },
  wipLocation: {
    wipJurisdictionId: {
      in: ['path'],
      errorMessage: 'Missing wip jurisdiction id',
      isInt: true,
      toInt: true,
    },
  },
  wipLocationUpdate: {
    wipJurisdictionId: {
      in: ['path'],
      errorMessage: 'Missing wip jurisdiction id',
      isInt: true,
      toInt: true,
    },
    wipLocationId: {
      in: ['path'],
      errorMessage: 'Missing wip location id',
      isInt: true,
      toInt: true,
    }
  }
}
