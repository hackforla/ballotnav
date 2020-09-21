'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Jurisdiction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Jurisdiction.belongsTo(models.State, { foreignKey: 'stateId' })
      models.Jurisdiction.hasMany(models.Location, {
        foreignKey: 'jurisdictionId',
      })
    }
  }
  Jurisdiction.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: DataTypes.STRING,
      internalContactName: DataTypes.STRING,
      internalContactEmail: DataTypes.STRING,
      internalContactPhone: DataTypes.STRING,
      internalContactFax: DataTypes.STRING,
      internalNotes: DataTypes.STRING,
      geojson: DataTypes.JSON,
      fipsCategory: DataTypes.STRING,
      fipsCountyCode: DataTypes.STRING,
      fipsStateAndCountyCode: DataTypes.STRING,
      fipsCountySubCode: DataTypes.STRING,
      fipsPlaceCode: DataTypes.STRING,
      fipsConsCityCode: DataTypes.STRING,
      authorityName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Jurisdiction',
    }
  )
  return Jurisdiction
}
