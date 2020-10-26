'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.State.hasMany(models.Jurisdiction, {
        foreignKey: 'state_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'jurisdictions',
      })
      models.State.hasMany(models.StateImportantDate, {
        foreignKey: 'state_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'importantDates',
      })
      models.State.hasMany(models.StateInfoTab, {
        foreignKey: 'state_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'infoTabs',
      })
      models.State.hasMany(models.StateNews, {
        foreignKey: 'state_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'news',
      })
      models.State.hasMany(models.StateNotice, {
        foreignKey: 'state_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'notices',
      })
      models.State.hasMany(models.StatePhone, {
        foreignKey: 'state_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'phones',
      })
      models.State.hasMany(models.StateUrl, {
        foreignKey: 'state_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
        as: 'urls',
      })
      /*

      // not yet registerable when this loads

      models.State.hasMany(models.UserState, {
        foreignKey: 'state_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
      })
      models.State.belongsToMany(models.User, {
        through: UserState,
      })

      */
    }
  }
  State.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        field: 'id',
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        field: 'name',
        allowNull: false,
      },
      abbreviation: {
        type: DataTypes.TEXT,
        field: 'abbreviation',
        allowNull: false,
      },
      authorityName: {
        type: DataTypes.TEXT,
        field: 'authority_name',
      },
      jurisdictionType: {
        type: DataTypes.ENUM(
          'County',
          'Parish',
          'Region',
          'County or City',
          'City or Township',
          'Municipality',
          'Town or City'
        ),
        field: 'jurisdiction_type',
        allowNull: false,
        defaultValue: 'County',
      },
      internalNotes: {
        type: DataTypes.TEXT,
        field: 'internal_notes',
      },
      isLateRegistrationPossible: {
        type: DataTypes.ENUM('Y', 'N', 'U'),
        field: 'is_late_registration_possible',
        allowNull: false,
        defaultValue: 'U',
      },
      voterRegistrationAuthority: {
        type: DataTypes.ENUM('state', 'jurisdiction'),
        field: 'voter_registration_authority',
        allowNull: false,
        defaultValue: 'jurisdiction',
      },
      fipsCode: {
        type: DataTypes.TEXT,
        field: 'fips_code',
      },
      fipsNumber: {
        type: DataTypes.INTEGER,
        field: 'fips_number',
      },
      stateType: {
        type: DataTypes.ENUM('State', 'Commonwealth', 'Federal District'),
        field: 'state_type',
        allowNull: false,
        defaultValue: 'State',
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
      geoJSON: {
        type: DataTypes.TEXT,
        field: 'geojson',
      },
      jurisdictionalWarning: {
        type: DataTypes.TEXT,
        field: 'jurisdictional_warning',
      },
      wipStateId: {
        type: DataTypes.INTEGER,
        field: 'wip_state_id',
        allowNull: true,
        comment:
          'Set to the WIP ID most recently published. This should be constrained to wip_state.id, but sequelize does not understand cyclic dependencies.',
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
      modelName: 'State',
      tableName: 'state',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  )
  return State
}
