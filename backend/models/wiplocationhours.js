'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class WipLocationHours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.WipLocationHours.belongsTo(models.WipLocation, {
        foreignKey: 'wip_location_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
      })
    }
  }
  WipLocationHours.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        field: 'id',
        primaryKey: true,
      },
      wipLocationId: {
        type: DataTypes.INTEGER,
        field: 'wip_location_id',
        allowNull: false,
        onDelete: 'restrict',
        onUpdate: 'cascade',
        references: {
          model: 'wip_location',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
      },
      beginDate: {
        type: DataTypes.DATEONLY,
        field: 'begin_date',
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        field: 'end_date',
        allowNull: false,
      },
      openTime: {
        type: DataTypes.TEXT,
        field: 'open_time',
        allowNull: false,
        comment: 'must be validated HH:MM',
      },
      closeTime: {
        type: DataTypes.TEXT,
        field: 'close_time',
        allowNull: false,
        comment: 'must be validated HH:MM',
      },
      note: {
        type: DataTypes.TEXT,
        field: 'note',
        allowNull: true,
      },
      useMonday: {
        type: DataTypes.BOOLEAN,
        field: 'use_monday',
        allowNull: false,
        defaultValue: false,
      },
      useTuesday: {
        type: DataTypes.BOOLEAN,
        field: 'use_tuesday',
        allowNull: false,
        defaultValue: false,
      },
      useWednesday: {
        type: DataTypes.BOOLEAN,
        field: 'use_wednesday',
        allowNull: false,
        defaultValue: false,
      },
      useThursday: {
        type: DataTypes.BOOLEAN,
        field: 'use_thursday',
        allowNull: false,
        defaultValue: false,
      },
      useFriday: {
        type: DataTypes.BOOLEAN,
        field: 'use_friday',
        allowNull: false,
        defaultValue: false,
      },
      useSaturday: {
        type: DataTypes.BOOLEAN,
        field: 'use_saturday',
        allowNull: false,
        defaultValue: false,
      },
      useSunday: {
        type: DataTypes.BOOLEAN,
        field: 'use_sunday',
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
    },
    {
      sequelize,
      modelName: 'WipLocationHours',
      tableName: 'wip_location_hours',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )
  return WipLocationHours
}
