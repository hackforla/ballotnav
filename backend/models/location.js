'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Location.belongsTo(models.Jurisdiction)
    }
  };
  Location.init({
    location_name: DataTypes.STRING,
    location_info: DataTypes.STRING,
    address_1: DataTypes.STRING,
    address_2: DataTypes.STRING,
    address_3: DataTypes.STRING,
    contact_name: DataTypes.STRING,
    contact_email: DataTypes.STRING,
    contact_fax: DataTypes.STRING,
    contact_phone: DataTypes.STRING,
    internal_note: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    is_early_dropoff_location: DataTypes.BOOLEAN,
    is_early_voting_location: DataTypes.BOOLEAN,
    is_elections_office: DataTypes.BOOLEAN,
    is_polling_location: DataTypes.BOOLEAN,
    scheduletype: DataTypes.STRING,
    is_drop_box: DataTypes.BOOLEAN,
    facilitytype_id: DataTypes.INTEGER,
    tempstring: DataTypes.STRING,
    timezone: DataTypes.STRING,
    continuous_open: DataTypes.DATE,
    continuous_close: DataTypes.DATE,
    schedule_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};
