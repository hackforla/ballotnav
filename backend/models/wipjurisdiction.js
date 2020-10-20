'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class WipJurisdiction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.WipJurisdiction.belongsTo(models.Jurisdiction, {
        foreignKey: 'jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'jurisdiction',
      })
      models.WipJurisdiction.hasMany(models.WipJurisdictionImportantDate, {
        foreignKey: 'wip_jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'importantDates',
      })
      models.WipJurisdiction.hasMany(models.WipJurisdictionInfoTab, {
        foreignKey: 'wip_jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'infoTabs',
      })
      models.WipJurisdiction.hasMany(models.WipJurisdictionNews, {
        foreignKey: 'wip_jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'news',
      })
      models.WipJurisdiction.hasMany(models.WipJurisdictionNotice, {
        foreignKey: 'wip_jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'notices',
      })
      models.WipJurisdiction.hasMany(models.WipJurisdictionPhone, {
        foreignKey: 'wip_jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'phones',
      })
      models.WipJurisdiction.hasMany(models.WipJurisdictionUrl, {
        foreignKey: 'wip_jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'urls',
      })
      models.WipJurisdiction.hasMany(models.WipLocation, {
        foreignKey: 'wip_jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'locations',
      })
      models.WipJurisdiction.belongsTo(models.User, {
        foreignKey: 'editor_user_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'user',
      })
    }
  }
  WipJurisdiction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        field: 'id',
        primaryKey: true,
      },
      jurisdictionId: {
        type: DataTypes.INTEGER,
        field: 'jurisdiction_id',
        allowNull: false,
        onDelete: 'restrict',
        onUpdate: 'cascade',
        references: {
          model: 'jurisdiction',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
      },
      editBasisWipJurisdictionId: {
        type: DataTypes.INTEGER,
        field: 'edit_basis_wip_jurisdiction_id',
        allowNull: true,
        comment:
          'This should be constrained to wip_jurisdiction.id (to identify the origin of this data) but sequelize does not understand cyclic dependencies',
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
      editorUserId: {
        type: DataTypes.INTEGER,
        field: 'editor_user_id',
        allowNull: true,
        onDelete: 'restrict',
        onUpdate: 'cascade',
        reference: {
          model: 'user',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
      },
      isReleased: {
        type: DataTypes.BOOLEAN,
        field: 'is_released',
        allowNull: false,
        defaultValue: false,
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
      modelName: 'WipJurisdiction',
      tableName: 'wip_jurisdiction',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  )
  return WipJurisdiction
}
