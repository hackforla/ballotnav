'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jurisdiction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Jurisdiction.belongsTo(models.state)
    }
  };
  Jurisdiction.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: DataTypes.STRING,
    internal_contact_name: DataTypes.STRING,
    internal_contact_email: DataTypes.STRING,
    internal_contact_phone: DataTypes.STRING,
    internal_contact_fax: DataTypes.STRING,
    internal_notes: DataTypes.STRING,
    geojson: DataTypes.STRING,
    fips_category: DataTypes.STRING,
    fips_county_code: DataTypes.STRING,
    fips_stateandcounty_code: DataTypes.STRING,
    fips_county_sub_code: DataTypes.STRING,
    fips_place_code: DataTypes.STRING,
    fips_cons_city_code: DataTypes.STRING,
    authority_name: DataTypes.STRING,
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
    modelName: 'Jurisdiction',
  });
  return Jurisdiction;
};
