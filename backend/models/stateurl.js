'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class StateUrl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.StateUrl.belongsTo(models.State, {
        foreignKey: 'state_id',
        onDelete: 'restrict',
        onupdate: 'cascade',
      })
    }
  }
  StateUrl.init(
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
        unique: 'state_id-urltype_id',
      },
      urlTypeId: {
        type: DataTypes.INTEGER,
        field: 'urltype_id',
        allownull: false,
        onDelete: 'restrict',
        onUpdate: 'cascade',
        references: {
          model: 'urltype',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
        unique: 'state_id-urltype_id',
      },
      url: {
        type: DataTypes.TEXT,
        field: 'url',
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        field: 'name',
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description',
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'StateUrl',
      tableName: 'state_url',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
      paranoid: true,
    }
  )
  return StateUrl
}
