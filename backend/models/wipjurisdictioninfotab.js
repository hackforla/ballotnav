'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class WipJurisdictionInfoTab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.WipJurisdictionInfoTab.belongsTo(models.WipJurisdiction, {
        foreignKey: 'wip_jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
        allowNull: false,
      })
    }
  }
  WipJurisdictionInfoTab.init(
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
        unique: 'wip_jurisdiction_id-caption',
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
        unique: 'wip_jurisdiction_id-caption',
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
      modelName: 'WipJurisdictionInfoTab',
      tableName: 'wip_jurisdiction_infotab',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )
  return WipJurisdictionInfoTab
}
