'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.State.hasMany(models.Jurisdiction, { foreignKey: 'state_id' })
    }
  }
  State.init(
    {
      abbreviation: DataTypes.STRING,
      name: DataTypes.STRING,
      authority_name: DataTypes.STRING,
      fax: DataTypes.STRING,
      fips_code: DataTypes.STRING,
      geojson: DataTypes.JSON,
      late_registration_possible: DataTypes.BOOLEAN,
      phone: DataTypes.STRING,
      website: DataTypes.STRING,
      website_voter_registration: DataTypes.STRING,
      website_ballot_check: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'State',
    }
  )
  return State
}
