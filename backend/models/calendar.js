'use strict'
const { Model, Deferrable } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Calendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Calendar.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id',
        comment: 'not autonum. date coerced into yyyymmdd format.',
        primaryKey: true,
      },
      dateActual: {
        type: DataTypes.DATEONLY,
        field: 'date_actual',
        allowNull: false,
      },
      daySuffix: {
        type: DataTypes.TEXT,
        field: 'day_suffix',
        allowNull: false,
      },
      dayName: {
        type: DataTypes.TEXT,
        field: 'day_name',
        allowNull: false,
      },
      dayOfWeek: {
        type: DataTypes.INTEGER,
        field: 'day_of_week',
        allowNull: false,
      },
      dayOfMonth: {
        type: DataTypes.INTEGER,
        field: 'day_of_month',
        allowNull: false,
      },
      dayOfQuarter: {
        type: DataTypes.INTEGER,
        field: 'day_of_quarter',
        allowNull: false,
      },
      dayOfYear: {
        type: DataTypes.INTEGER,
        field: 'day_of_year',
        allowNull: false,
      },
      weekOfMonth: {
        type: DataTypes.INTEGER,
        field: 'week_of_month',
        allowNull: false,
      },
      weekOfYear: {
        type: DataTypes.INTEGER,
        field: 'week_of_year',
        allowNull: false,
      },
      weekOfYearIso: {
        type: DataTypes.TEXT,
        field: 'week_of_year_iso',
        allowNull: false,
      },
      monthActual: {
        type: DataTypes.INTEGER,
        field: 'month_actual',
        allowNull: false,
      },
      monthName: {
        type: DataTypes.TEXT,
        field: 'month_name',
        allowNull: false,
      },
      monthAbbreviation: {
        type: DataTypes.TEXT,
        field: 'month_abbreviation',
        allowNull: false,
      },
      quarterActual: {
        type: DataTypes.INTEGER,
        field: 'quarter_actual',
        allowNull: false,
      },
      quarterName: {
        type: DataTypes.TEXT,
        field: 'quarter_name',
        allowNull: false,
      },
      yearActual: {
        type: DataTypes.INTEGER,
        field: 'year_actual',
        allowNull: false,
      },
      firstDayOfWeek: {
        type: DataTypes.DATEONLY,
        field: 'first_day_of_week',
        allowNull: false,
      },
      lastDayOfWeek: {
        type: DataTypes.DATEONLY,
        field: 'last_day_of_week',
        allowNull: false,
      },
      firstDayOfMonth: {
        type: DataTypes.DATEONLY,
        field: 'first_day_of_month',
        allowNull: false,
      },
      lastDayOfMonth: {
        type: DataTypes.DATEONLY,
        field: 'last_day_of_month',
        allowNull: false,
      },
      firstDayOfQuarter: {
        type: DataTypes.DATEONLY,
        field: 'first_day_of_quarter',
        allowNull: false,
      },
      lastDayOfQuarter: {
        type: DataTypes.DATEONLY,
        field: 'last_day_of_quarter',
        allowNull: false,
      },
      firstDayOfYear: {
        type: DataTypes.DATEONLY,
        field: 'first_day_of_year',
        allowNull: false,
      },
      lastDayOfYear: {
        type: DataTypes.DATEONLY,
        field: 'last_day_of_year',
        allowNull: false,
      },
      mmyyyy: {
        type: DataTypes.TEXT,
        field: 'mmyyyy',
        allowNull: false,
      },
      mmddyyyy: {
        type: DataTypes.TEXT,
        field: 'mmddyyyy',
        allowNull: false,
      },
      isWeekend: {
        type: DataTypes.BOOLEAN,
        field: 'is_weekend',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Calendar',
      tableName: 'calendar',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
      paranoid: false,
      timestamps: false,
    }
  )
  return Calendar
}
