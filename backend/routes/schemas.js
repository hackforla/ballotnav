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
}
