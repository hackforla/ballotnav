'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserJurisdiction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.UserJurisdiction.belongsTo(models.Jurisdiction, {
        foreignKey: 'jurisdiction_id',
        onDelete: 'restrict',
        onupdate: 'cascade',
      })
      models.UserJurisdiction.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'restrict',
        onupdate: 'cascade',
      })
    }
  }
  UserJurisdiction.init(
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
      },
      jurisdictionId: {
        type: DataTypes.INTEGER,
        field: 'jurisdiction_id',
        allownull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'jurisdiction',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
      },
      status: {
        allowNull: false,
        field: 'status',
        type: DataTypes.ENUM('requested', 'editor', 'none'),
      },
    },
    {
      sequelize,
      modelName: 'UserJurisdiction',
      tableName: 'user_jurisdiction',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
      paranoid: true,
    }
  )
  return UserJurisdiction
}
