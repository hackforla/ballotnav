/*
 * define dropoffs table
 */

const Dropoffs = function (sequelize, DataTypes) {
  return sequelize.define('Dropoffs', {
    state_name :{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    state_short_code: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    county: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    position: {
        type: DataTypes.STRING
    }, 
    contact_name: {
        type: DataTypes.STRING
    },
    address_1: {
        type: DataTypes.STRING
    },
    address_2: {
        type: DataTypes.STRING
    }, 
    email: {
        type: DataTypes.STRING
    },
    fax: {
        type: DataTypes.STRING(40)
    },
    phone: {
        type: DataTypes.STRING(40)
    },
    county_website: {
        type: DataTypes.STRING
    },
    source_url: {
        type: DataTypes.STRING
    },
    latitude: {
        type: DataTypes.INTEGER
    }, 
    longitude: {
        type: DataTypes.INTEGER
    } 
  }); 
}

module.exports = Dropoffs;
