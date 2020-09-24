'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UrlType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UrlType.init(
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
        unique: true,
      },
      doNotPublish: {
        type: DataTypes.BOOLEAN,
        field: 'do_not_publish',
        allowNull: false,
        defaultValue: false,
      },
      isEmail: {
        type: DataTypes.BOOLEAN,
        field: 'is_email',
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'UrlType',
      tableName: 'urltype',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
      paranoid: true,
    }
  )
  return UrlType
}
