'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Location.belongsTo(models.Jurisdiction, {
        foreignKey: 'jurisdictionId',
      })
    }
  }
  Location.init(
    {
      locationName: DataTypes.STRING,
      locationInfo: DataTypes.STRING,
      address1: DataTypes.STRING,
      address2: DataTypes.STRING,
      address3: DataTypes.STRING,
      contactName: DataTypes.STRING,
      contactEmail: DataTypes.STRING,
      contactFax: DataTypes.STRING,
      contactPhone: DataTypes.STRING,
      internalNote: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      isEarlyDropoffLocation: DataTypes.BOOLEAN,
      isEarlyVotingLocation: DataTypes.BOOLEAN,
      isElectionsOffice: DataTypes.BOOLEAN,
      isPollingLocation: DataTypes.BOOLEAN,
      scheduletype: DataTypes.STRING,
      isDropBox: DataTypes.BOOLEAN,
      facilitytypeId: DataTypes.INTEGER,
      tempstring: DataTypes.STRING,
      timezone: DataTypes.STRING,
      continuousOpen: DataTypes.DATE,
      continuousClose: DataTypes.DATE,
      scheduleDescription: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Location',
    }
  )
  return Location
}
