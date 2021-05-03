'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class WipStateInfoTab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.WipStateInfoTab.belongsTo(models.WipState, {
        foreignKey: 'wip_state_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
      })
    }
  }
  WipStateInfoTab.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        field: 'id',
        primaryKey: true,
        unique: 'id-caption',
      },
      wipStateId: {
        type: DataTypes.INTEGER,
        field: 'wip_state_id',
        allowNull: false,
        onDelete: 'restrict',
        onUpdate: 'cascade',
        references: {
          model: 'wip_state',
          key: 'id',
          deferrable: Deferrable.INITIALLY_DEFERRED,
        },
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
        unique: 'id-caption',
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
      modelName: 'WipStateInfoTab',
      tableName: 'wip_state_infotab',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )
  return WipStateInfoTab
}
