'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserState extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserState.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        field: 'id',
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        allownull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'user',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
        unique: 'user_id-state_id',
      },
      stateId: {
        type: DataTypes.INTEGER,
        field: 'state_id',
        allownull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'state',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
        unique: 'user_id-state_id',
      },
      status: {
        allowNull: false,
        field: 'status',
        type: DataTypes.ENUM('requested', 'editor', 'none'),
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
      modelName: 'UserState',
      tableName: 'user_state',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  )
  return UserState
}
