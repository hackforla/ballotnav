'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class StateNotice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.StateNotice.belongsTo(models.State, {
        foreignKey: 'state_id',
        onDelete: 'restrict',
        onupdate: 'cascade',
      })
    }
  }
  StateNotice.init(
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
        allownull: false,
        onDelete: 'restrict',
        onUpdate: 'cascade',
        references: {
          model: 'state',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
      },
      datePosted: {
        type: DataTypes.DATE,
        field: 'date_posted',
        allowNull: false,
      },
      severity: {
        type: DataTypes.ENUM('critical', 'info'),
        field: 'severity',
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        field: 'message',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'StateNotice',
      tableName: 'state_notice',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
      paranoid: true,
    }
  )
  return StateNotice
}
