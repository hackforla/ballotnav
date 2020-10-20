'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class StatePhone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.StatePhone.belongsTo(models.State, {
        foreignKey: 'state_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
      })
    }
  }
  StatePhone.init(
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
        allowNull: false,
        onDelete: 'restrict',
        onUpdate: 'cascade',
        references: {
          model: 'state',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
      },
      phoneNumberTypeId: {
        type: DataTypes.INTEGER,
        field: 'phonenumbertype_id',
        allowNull: false,
        onDelete: 'restrict',
        onUpdate: 'cascade',
        references: {
          model: 'phonenumbertype',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
      },
      phoneNumber: {
        type: DataTypes.TEXT,
        field: 'phone_number',
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description',
        allowNull: true,
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
    },
    {
      sequelize,
      modelName: 'StatePhone',
      tableName: 'state_phone',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )
  return StatePhone
}
