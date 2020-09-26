'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class WipLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.WipLocation.belongsTo(models.WipJurisdiction, {
        foreignKey: 'wip_jurisdiction_id',
        onDelete: 'restrict',
        onupdate: 'cascade',
      })
      models.WipLocation.hasMany(models.WipLocationHours, {
        foreignKey: 'wip_location_id',
        onDelete: 'restrict',
        onupdate: 'cascade',
      })
    }
  }
  WipLocation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        field: 'id',
        primaryKey: true,
      },
      wipJurisdictionId: {
        type: DataTypes.INTEGER,
        field: 'wip_jurisdiction_id',
        allownull: false,
        onDelete: 'restrict',
        onUpdate: 'cascade',
        references: {
          model: 'wip_jurisdiction',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
      },
      facilityTypeId: {
        type: DataTypes.INTEGER,
        field: 'facilitytype_id',
        allownull: false,
        onDelete: 'restrict',
        onUpdate: 'cascade',
        references: {
          model: 'facilitytype',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
      },
      name: {
        type: DataTypes.TEXT,
        field: 'name',
        allowNull: true,
      },
      infoPublic: {
        type: DataTypes.TEXT,
        field: 'info_public',
        allowNull: true,
      },
      timezone: {
        type: DataTypes.TEXT,
        field: 'timezone',
        allowNull: true,
      },
      address1: {
        type: DataTypes.TEXT,
        field: 'address1',
        allowNull: true,
      },
      address2: {
        type: DataTypes.TEXT,
        field: 'address2',
        allowNull: true,
      },
      address3: {
        type: DataTypes.TEXT,
        field: 'address3',
        allowNull: true,
      },
      city: {
        type: DataTypes.TEXT,
        field: 'city',
        allowNull: true,
      },
      state: {
        type: DataTypes.TEXT,
        field: 'state',
        allowNull: true,
      },
      zip: {
        type: DataTypes.TEXT,
        field: 'zip',
        allowNull: true,
      },
      contactName: {
        type: DataTypes.TEXT,
        field: 'contact_name',
        allowNull: true,
      },
      contactEmail: {
        type: DataTypes.TEXT,
        field: 'contact_email',
        allowNull: true,
      },
      contactFax: {
        type: DataTypes.TEXT,
        field: 'contact_fax',
        allowNull: true,
      },
      contactPhone: {
        type: DataTypes.TEXT,
        field: 'contact_phone',
        allowNull: true,
      },
      internalNote: {
        type: DataTypes.TEXT,
        field: 'internal_note',
        allowNull: true,
      },
      latitude: {
        type: DataTypes.TEXT,
        field: 'latitude',
        allowNull: true,
      },
      longitude: {
        type: DataTypes.TEXT,
        field: 'longitude',
        allowNull: true,
      },
      geomPoint: {
        type: DataTypes.GEOMETRY('POINT', 4326),
        field: 'geom_point',
        allowNull: true,
      },
      isEarlyDropoffLocation: {
        type: DataTypes.ENUM('Y', 'N', 'U'),
        field: 'is_early_dropoff_location',
        allowNull: false,
        defaultValue: 'U',
      },
      isEarlyVotingLocation: {
        type: DataTypes.ENUM('Y', 'N', 'U'),
        field: 'is_early_voting_location',
        allowNull: false,
        defaultValue: 'U',
      },
      isElectionsOffice: {
        type: DataTypes.ENUM('Y', 'N', 'U'),
        field: 'is_elections_office',
        allowNull: false,
        defaultValue: 'U',
      },
      isPollingLocation: {
        type: DataTypes.ENUM('Y', 'N', 'U'),
        field: 'is_polling_location',
        allowNull: false,
        defaultValue: 'U',
      },
      isDropBox: {
        type: DataTypes.ENUM('Y', 'N', 'U'),
        field: 'is_drop_box',
        allowNull: false,
        defaultValue: 'U',
      },
      isHandicapAccessible: {
        type: DataTypes.ENUM('Y', 'N', 'U'),
        field: 'is_handicap_accessible',
        allowNull: false,
        defaultValue: 'U',
      },
      isStaffedLocation: {
        type: DataTypes.ENUM('Y', 'N', 'U'),
        field: 'is_staffed_location',
        allowNull: false,
        defaultValue: 'U',
      },
      scheduleType: {
        type: DataTypes.ENUM('description', 'hours', 'continuous'),
        field: 'schedule_type',
        allowNull: false,
      },
      scheduleDescription: {
        type: DataTypes.TEXT,
        field: 'schedule_description',
        allowNull: true,
      },
      continuousOpenDate: {
        type: DataTypes.DATEONLY,
        field: 'continuous_open_date',
        allowNull: true,
      },
      continuousOpenTime: {
        type: DataTypes.TEXT,
        field: 'continuous_open_time',
        allowNull: true,
      },
      continuousCloseDate: {
        type: DataTypes.DATEONLY,
        field: 'continuous_close_date',
        allowNull: true,
      },
      continuousCloseTime: {
        type: DataTypes.TEXT,
        field: 'continuous_close_time',
        allowNull: true,
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
    },
    {
      sequelize,
      modelName: 'WipLocation',
      tableName: 'wip_location',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
      paranoid: true,
    }
  )
  return WipLocation
}
