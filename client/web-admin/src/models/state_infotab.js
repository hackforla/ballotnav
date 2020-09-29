import { DataTypes, Deferrable } from './_helpers'

const fields = {
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
    allownull: false,
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
}

export default fields
