'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Jurisdiction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Jurisdiction.belongsTo(models.State, {
        foreignKey: 'state_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'state',
      })
      models.Jurisdiction.hasMany(models.JurisdictionImportantDate, {
        foreignKey: 'jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'importantDates',
      })
      models.Jurisdiction.hasMany(models.JurisdictionInfoTab, {
        foreignKey: 'jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'infoTabs',
      })
      models.Jurisdiction.hasMany(models.JurisdictionNews, {
        foreignKey: 'jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'news',
      })
      models.Jurisdiction.hasMany(models.JurisdictionNotice, {
        foreignKey: 'jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'notices',
      })
      models.Jurisdiction.hasMany(models.JurisdictionPhone, {
        foreignKey: 'jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'phones',
      })
      models.Jurisdiction.hasMany(models.JurisdictionUrl, {
        foreignKey: 'jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'urls',
      })
      models.Jurisdiction.hasMany(models.Location, {
        foreignKey: 'jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'locations',
      })
      models.Jurisdiction.belongsToMany(models.User, {
        through: models.UserJurisdiction,
        as: 'users',
        foreignKey: 'user_id',
      })
      models.Jurisdiction.hasMany(models.UserJurisdiction, {
        as: 'userJurisdictions',
        foreignKey: 'jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
      })
    }
  }

  Jurisdiction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        field: 'id',
        primaryKey: true,
      },
      stateId: {
        type: DataTypes.INTEGER,
        field: 'state_id',
        allowNull: false,
        onDelete: 'restrict',
        onUpdate: 'cascade',
        references: {
          model: 'state',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
      },
      name: {
        type: DataTypes.TEXT,
        field: 'name',
        allowNull: false,
      },
      authorityName: {
        type: DataTypes.TEXT,
        field: 'authority_name',
        allowNull: true,
      },
      mailAddress1: {
        type: DataTypes.TEXT,
        field: 'mail_address1',
        allowNull: true,
      },
      mailAddress2: {
        type: DataTypes.TEXT,
        field: 'mail_address2',
        allowNull: true,
      },
      mailAddress3: {
        type: DataTypes.TEXT,
        field: 'mail_address3',
        allowNull: true,
      },
      isEaj: {
        type: DataTypes.BOOLEAN,
        field: 'is_eaj',
        allowNull: false,
        defaultValue: true,
      },
      isEajExclusive: {
        type: DataTypes.BOOLEAN,
        field: 'is_eaj_exclusive',
        allowNull: false,
        defaultValue: true,
      },
      internalNotes: {
        type: DataTypes.TEXT,
        field: 'internal_notes',
        allowNull: true,
      },
      timezoneDefault: {
        type: DataTypes.TEXT,
        field: 'timezone_default',
      },
      timezoneEnforced: {
        type: DataTypes.BOOLEAN,
        field: 'timezone_enforced',
        allowNull: false,
        defaultValue: false,
      },
      geojson: {
        type: DataTypes.TEXT,
        field: 'geojson',
        allowNull: true,
      },
      fipsCategory: {
        type: DataTypes.TEXT,
        field: 'fips_category',
        allowNull: true,
      },
      fipsCountyCode: {
        type: DataTypes.TEXT,
        field: 'fips_county_code',
        allowNull: true,
      },
      fipsCountyNumber: {
        type: DataTypes.INTEGER,
        field: 'fips_county_number',
        allowNull: true,
      },
      fipsCompleteCountyCode: {
        type: DataTypes.TEXT,
        field: 'fips_complete_county_code',
        allowNull: true,
      },
      fipsCompleteCountyNumber: {
        type: DataTypes.INTEGER,
        field: 'fips_complete_county_number',
        allowNull: true,
      },
      fipsCountySubCode: {
        type: DataTypes.TEXT,
        field: 'fips_county_sub_code',
        allowNull: true,
      },
      fipsPlaceCode: {
        type: DataTypes.TEXT,
        field: 'fips_place_code',
        allowNull: true,
      },
      fipsConsCityCode: {
        type: DataTypes.TEXT,
        field: 'fips_cons_city_code',
        allowNull: true,
      },
      wipJurisdictionId: {
        type: DataTypes.INTEGER,
        field: 'wip_jurisdiction_id',
        allowNull: true,
        comment:
          'Set to the WIP ID most recently published. This should be constrained to wip_jurisdiction.id, but sequelize does not understand cyclic dependencies.',
      },
      population: {
        type: DataTypes.INTEGER,
        field: 'population',
        allowNull: true,
      },
      isValidatedTimezone: {
        type: DataTypes.BOOLEAN,
        field: 'is_validated_timezone',
        allowNull: false,
        defaultValue: false,
      },
      isValidatedImportantdates: {
        type: DataTypes.BOOLEAN,
        field: 'is_validated_importantdates',
        allowNull: false,
        defaultValue: false,
      },
      isValidatedPhones: {
        type: DataTypes.BOOLEAN,
        field: 'is_validated_phones',
        allowNull: false,
        defaultValue: false,
      },
      isValidatedUrls: {
        type: DataTypes.BOOLEAN,
        field: 'is_validated_urls',
        allowNull: false,
        defaultValue: false,
      },
      isValidatedNotices: {
        type: DataTypes.BOOLEAN,
        field: 'is_validated_notices',
        allowNull: false,
        defaultValue: false,
      },
      isValidatedLocations: {
        type: DataTypes.BOOLEAN,
        field: 'is_validated_locations',
        allowNull: false,
        defaultValue: false,
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        field: 'is_published',
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Jurisdiction',
      tableName: 'jurisdiction',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  )
  return Jurisdiction
}
