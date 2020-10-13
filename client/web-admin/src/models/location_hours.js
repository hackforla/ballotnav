import { DataTypes } from './_helpers'

const fields = {
  // id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   autoIncrement: true,
  //   field: 'id',
  //   primaryKey: true,
  // },
  // wipLocationId: {
  //   type: DataTypes.INTEGER,
  //   field: 'wip_location_id',
  //   allownull: false,
  //   onDelete: 'restrict',
  //   onUpdate: 'cascade',
  //   references: {
  //     model: 'wip_location',
  //     key: 'id',
  //     deferrable: Deferrable.INITIALLY_DEFERRED,
  //   },
  // },
  beginDate: {
    type: 'date',
    field: 'begin_date',
    allowNull: false,
  },
  endDate: {
    type: 'date',
    field: 'end_date',
    allowNull: false,
  },
  openTime: {
    type: 'time',
    field: 'open_time',
    allowNull: false,
    comment: 'must be validated HH:MM',
  },
  closeTime: {
    type: 'time',
    field: 'close_time',
    allowNull: false,
    comment: 'must be validated HH:MM',
  },
  note: {
    type: 'textarea',
    field: 'note',
    allowNull: true,
  },
  useMonday: {
    type: DataTypes.BOOLEAN,
    field: 'use_monday',
    allowNull: false,
    defaultValue: false,
  },
  useTuesday: {
    type: DataTypes.BOOLEAN,
    field: 'use_tuesday',
    allowNull: false,
    defaultValue: false,
  },
  useWednesday: {
    type: DataTypes.BOOLEAN,
    field: 'use_wednesday',
    allowNull: false,
    defaultValue: false,
  },
  useThursday: {
    type: DataTypes.BOOLEAN,
    field: 'use_thursday',
    allowNull: false,
    defaultValue: false,
  },
  useFriday: {
    type: DataTypes.BOOLEAN,
    field: 'use_friday',
    allowNull: false,
    defaultValue: false,
  },
  useSaturday: {
    type: DataTypes.BOOLEAN,
    field: 'use_saturday',
    allowNull: false,
    defaultValue: false,
  },
  useSunday: {
    type: DataTypes.BOOLEAN,
    field: 'use_sunday',
    allowNull: false,
    defaultValue: false,
  },
  // createdAt: {
  //   type: DataTypes.DATE,
  //   field: 'created_at',
  //   allowNull: true,
  // },
  // updatedAt: {
  //   type: DataTypes.DATE,
  //   field: 'updated_at',
  //   allowNull: true,
  // },
  // deletedAt: {
  //   type: DataTypes.DATE,
  //   field: 'deleted_at',
  //   allowNull: true,
  // },
}

export default fields
