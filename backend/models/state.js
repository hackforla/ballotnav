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
      models.State.hasMany(models.Jurisdiction, { foreignKey: 'stateId' })
    }
  }
  State.init(
    {
      abbreviation: DataTypes.STRING,
      name: DataTypes.STRING,
      authorityName: DataTypes.STRING,
      fax: DataTypes.STRING,
      fipsCode: DataTypes.STRING,
      geojson: DataTypes.JSON,
      lateRegistrationPossible: DataTypes.BOOLEAN,
      phone: DataTypes.STRING,
      website: DataTypes.STRING,
      websiteVoterRegistration: DataTypes.STRING,
      websiteBallotCheck: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'State',
    }
  )
  return State
}
