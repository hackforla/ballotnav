'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class JurisdictionNews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.JurisdictionNews.belongsTo(models.Jurisdiction, {
        foreignKey: 'jurisdiction_id',
        onDelete: 'restrict',
        onUpdate: 'cascade',
      })
    }
  }
  JurisdictionNews.init(
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
        onDelete: 'cascade',
        onUpdate: 'cascade',
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
      caption: {
        type: DataTypes.TEXT,
        field: 'caption',
        allowNull: false,
      },
      url: {
        type: DataTypes.TEXT,
        field: 'url',
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        field: 'summary',
        allowNull: true,
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
      modelName: 'JurisdictionNews',
      tableName: 'jurisdiction_news',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )
  return JurisdictionNews
}
