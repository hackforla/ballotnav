'use strict';
const {
  Model, Deferrable
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WipJurisdiction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.WipJurisdiction.belongsTo(models.Jurisdiction, { foreignKey: 'jurisdiction_id', onDelete:'restrict', onupdate:'cascade', allownull: false });
      models.WipJurisdiction.hasMany(models.WipJurisdictionImportantDate, { foreignKey: 'wip_jurisdiction_id' , onDelete:'restrict', onupdate:'cascade', allownull: false });
      models.WipJurisdiction.hasMany(models.WipJurisdictionInfoTab, { foreignKey: 'wip_jurisdiction_id', onDelete:'restrict', onupdate:'cascade', allownull: false});
      models.WipJurisdiction.hasMany(models.WipJurisdictionNews, { foreignKey: 'wip_jurisdiction_id', onDelete:'restrict', onupdate:'cascade', allownull: false });
      models.WipJurisdiction.hasMany(models.WipJurisdictionNotice, { foreignKey: 'wip_jurisdiction_id', onDelete:'restrict', onupdate:'cascade', allownull: false });
      models.WipJurisdiction.hasMany(models.WipJurisdictionPhone, { foreignKey: 'wip_jurisdiction_id', onDelete:'restrict', onupdate:'cascade', allownull: false });
      models.WipJurisdiction.hasMany(models.WipJurisdictionUrl, { foreignKey: 'wip_jurisdiction_id', onDelete:'restrict', onupdate:'cascade', allownull: false });
      models.WipJurisdiction.hasMany(models.WipLocation, { foreignKey: 'wip_jurisdiction_id', onDelete:'restrict', onupdate:'cascade', allownull: false });
    }
  };
  WipJurisdiction.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      field: 'id',
      primaryKey: true
    },
    jurisdictionId: {
      type: DataTypes.INTEGER,
      field: 'jurisdiction_id',
      allownull: false,
      onDelete: 'restrict',
      onUpdate: 'cascade',
      references: {
        model: 'jurisdiction',
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    name: {
      type: DataTypes.TEXT,
      field: 'name', 
      allowNull: false
    },
    authorityName: {
      type: DataTypes.TEXT,
      field: 'authority_name', 
      allowNull: true
    },
    mailAddress1: {
      type: DataTypes.TEXT, 
      field: 'mail_address1', 
      allowNull: true
    },
    mailAddress2: {
      type: DataTypes.TEXT, 
      field: 'mail_address2', 
      allowNull: true
    },
    mailAddress3: {
      type: DataTypes.TEXT, 
      field: 'mail_address3', 
      allowNull: true
    },
    isNotValid: {
      type: DataTypes.BOOLEAN,
      field: 'is_not_valid', 
      allowNull: false,
      defaultValue: false
    },
    internalNotes: {
      type: DataTypes.TEXT,
      field: 'internal_notes', 
      allowNull: true
    },
    fipsCategory: {
      type: DataTypes.TEXT,
      field: 'fips_category', 
      allowNull: true
    },
    fipsCountyCode: {
      type: DataTypes.TEXT,
      field: 'fips_county_code', 
      allowNull: true
    },
    fipsCountyNumber: {
      type: DataTypes.INTEGER,
      field: 'fips_county_number', 
      allowNull: true
    },
    fipsCompleteCountyCode: {
      type: DataTypes.TEXT,
      field: 'fips_complete_county_code', 
      allowNull: true
    },
    fipsCompleteCountyNumber: {
      type: DataTypes.INTEGER,
      field: 'fips_complete_county_number', 
      allowNull: true
    },
    fipsCountySubCode: {
      type: DataTypes.TEXT,
      field: 'fips_county_sub_code', 
      allowNull: true
    },
    fipsPlaceCode: {
      type: DataTypes.TEXT,
      field: 'fips_place_code', 
      allowNull: true
    },
    fipsConsCityCode: {
      type: DataTypes.TEXT,
      field: 'fips_cons_city_code', 
      allowNull: true
    },
    publishedDate: {
      type: DataTypes.DATE,
      field: 'published_date',
      allowNull: true
    },
    publishedUserId: {
      type: DataTypes.INTEGER,
      field: 'published_user_id',
      allowNull: true,
      onDelete: 'restrict',
      onupdate: 'cascade',
      reference: {
        model: 'user',
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    }
  }, {
    sequelize,
    modelName: 'WipJurisdiction',
    tableName: 'wip_jurisdiction',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
    paranoid: true
  });
  return WipJurisdiction;
};