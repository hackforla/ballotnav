'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PhoneNumberType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PhoneNumberType.init(
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
      sortOrder: {
        type: DataTypes.INTEGER,
        field: 'sort_order',
        allowNull: false,
        defaultValue: 1,
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
      modelName: 'PhoneNumberType',
      tableName: 'phonenumbertype',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  )
  return PhoneNumberType
}
