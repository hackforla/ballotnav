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
  wipLocationCreate: {
    wipJurisdictionId: {
      in: ['path'],
      errorMessage: 'Missing wip jurisdiction id',
      isInt: true,
      toInt: true,
    },
    scheduleType: {
      in: ['body'],
      errorMessage: 'Missing required field: schedulType',
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
    },
  },
  // POST /user/assignments
  // assign a user to a jurisdiction id
  createAssignments: {
    userId: {
      in: ['body'],
      errorMessage: 'Missing required data "userId"',
      isInt: true,
      toInt: true,
    },
    jurisdictionIds: {
      in: ['body'],
      errorMessage: 'Missing required data "jurisdictionIds"',
    },
    removedJurisdictionIds: {
      in: ['body'],
      errorMessage: 'Missing required data "removedJurisdictionIds"',
    },
  },
}
