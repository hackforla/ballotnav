'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class JurisdictionImportantDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.JurisdictionImportantDate.belongsTo(models.Jurisdiction, {
        foreignKey: 'jurisdiction_id',
        onDelete: 'restrict',
        onupdate: 'cascade',
      })
    }
  }
  JurisdictionImportantDate.init(
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
        allownull: false,
        onDelete: 'restrict',
        onUpdate: 'cascade',
        references: {
          model: 'jurisdiction',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
        unique: 'jurisdiction_id-importantdatetype_id',
      },
      importantDateTypeId: {
        type: DataTypes.INTEGER,
        field: 'importantdatetype_id',
        allownull: false,
        onDelete: 'restrict',
        onUpdate: 'cascade',
        references: {
          model: 'importantdatetype',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
        unique: 'jurisdiction_id-importantdatetype_id',
      },
      beginDate: {
        type: DataTypes.DATE,
        field: 'begin_date',
        allownull: true,
      },
      beginTime: {
        type: DataTypes.TEXT,
        field: 'begin_time',
        allownull: true,
      },
      endDate: {
        type: DataTypes.DATE,
        field: 'end_date',
        allownull: false,
      },
      endTime: {
        type: DataTypes.TEXT,
        field: 'end_time',
        allownull: false,
      },
      note: {
        type: DataTypes.TEXT,
        field: 'note',
        allownull: true,
      },
    },
    {
      sequelize,
      modelName: 'JurisdictionImportantDate',
      tableName: 'jurisdiction_importantdate',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
      paranoid: true,
    }
  )
  return JurisdictionImportantDate
}
