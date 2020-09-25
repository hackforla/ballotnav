'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class WipStatePhone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.WipStatePhone.belongsTo(models.WipState, {
        foreignKey: 'wip_state_id',
        onDelete: 'restrict',
        onupdate: 'cascade',
      })
    }
  }
  WipStatePhone.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        field: 'id',
        primaryKey: true,
      },
      wipStateId: {
        type: DataTypes.INTEGER,
        field: 'wip_state_id',
        allownull: false,
        onDelete: 'restrict',
        onUpdate: 'cascade',
        references: {
          model: 'wip_state',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
      },
      phoneNumberTypeId: {
        type: DataTypes.INTEGER,
        field: 'phonenumbertype_id',
        allownull: false,
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
    },
    {
      sequelize,
      modelName: 'WipStatePhone',
      tableName: 'wip_state_phone',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
      paranoid: true,
    }
  )
  return WipStatePhone
}
