'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class JurisdictionNotice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.JurisdictionNotice.belongsTo(models.Jurisdiction, {
        foreignKey: 'jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
      })
    }
  }
  JurisdictionNotice.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        field: 'id',
        primaryKey: true,
      },
      jurisdictionId: {
        type: DataTypes.INTEGER,
        field: 'jurisdiction_id',
        allowNull: false,
        references: {
          model: 'jurisdiction',
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
      modelName: 'JurisdictionNotice',
      tableName: 'jurisdiction_notice',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )
  return JurisdictionNotice
}
