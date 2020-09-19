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
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'state',
  });
  return state;
};
