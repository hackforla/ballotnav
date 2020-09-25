'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /*
      models.User.belongsToMany(models.Jurisdiction, {
        through: UserJurisdiction,
      })
      models.User.hasMany(models.UserJurisdiction, {
        foreignKey: 'user_id',
        onDelete: 'restrict',
        onupdate: 'cascade',
      })
      */
    }
  }
  User.init(
    {
      firstName: {
        allowNull: false,
        field: 'first_name',
        type: DataTypes.TEXT,
      },
      lastName: {
        allowNull: false,
        field: 'last_name',
        type: DataTypes.TEXT,
      },
      email: {
        allowNull: false,
        field: 'email',
        unique: true,
        type: DataTypes.TEXT,
        validate: {
          isEmail: true,
        },
      },
      role: {
        allowNull: false,
        field: 'role',
        type: DataTypes.ENUM('volunteer', 'admin'),
      },
      passwordHash: {
        allowNull: false,
        field: 'password_hash',
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'user',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
      paranoid: true,
    }
  )
  return User
}
