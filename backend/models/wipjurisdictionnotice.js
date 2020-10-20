'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class WipJurisdictionNotice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.WipJurisdictionNotice.belongsTo(models.WipJurisdiction, {
        foreignKey: 'wip_jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
      })
    }
  }
  WipJurisdictionNotice.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        field: 'id',
        primaryKey: true,
      },
      wipJurisdictionId: {
        type: DataTypes.INTEGER,
        field: 'wip_jurisdiction_id',
        allowNull: false,
        onDelete: 'restrict',
        onUpdate: 'cascade',
        references: {
          model: 'wip_jurisdiction',
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
      modelName: 'WipJurisdictionNotice',
      tableName: 'wip_jurisdiction_notice',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )
  return WipJurisdictionNotice
}
