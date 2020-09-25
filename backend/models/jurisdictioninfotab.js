'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class JurisdictionInfoTab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.JurisdictionInfoTab.belongsTo(models.Jurisdiction, {
        foreignKey: 'jurisdiction_id',
        onDelete: 'restrict',
        onupdate: 'cascade',
        allownull: false,
      })
    }
  }
  JurisdictionInfoTab.init(
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
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'jurisdiction',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
        unique: 'jurisdiction_id-caption',
      },
      sortOrder: {
        type: DataTypes.INTEGER,
        field: 'sort_order',
        allowNull: false,
        defaultValue: 1,
      },
      caption: {
        type: DataTypes.TEXT,
        field: 'caption',
        allowNull: false,
        unique: 'jurisdiction_id-caption',
      },
      markdown: {
        type: DataTypes.TEXT,
        field: 'markdown',
        allowNull: true,
      },
      html: {
        type: DataTypes.TEXT,
        field: 'html',
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM('document', 'infotab', 'contactinfo', 'news'),
        field: 'type',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'JurisdictionInfoTab',
      tableName: 'jurisdiction_infotab',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
      paranoid: true,
    }
  )
  return JurisdictionInfoTab
}
