'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class state extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  state.init({
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
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'state',
  });
  return state;
};
