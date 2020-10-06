import { DataTypes, Deferrable } from './_helpers'

const fields = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    field: 'id',
    primaryKey: true,
  },
  wipLocationId: {
    type: DataTypes.INTEGER,
    field: 'wip_location_id',
    allownull: false,
    onDelete: 'restrict',
    onUpdate: 'cascade',
    references: {
      model: 'wip_location',
      key: 'id',
      deferrable: Deferrable.INITIALLY_DEFERRED,
    },
  },
  beginDate: {
    type: DataTypes.DATEONLY,
    field: 'begin_date',
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    field: 'end_date',
    allowNull: false,
  },
  openTime: {
    type: DataTypes.TEXT,
    field: 'open_time',
    allowNull: false,
    comment: 'must be validated HH:MM',
  },
  closeTime: {
    type: DataTypes.TEXT,
    field: 'close_time',
    allowNull: false,
    comment: 'must be validated HH:MM',
  },
  note: {
    type: DataTypes.TEXT,
    field: 'note',
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
}

export default fields
