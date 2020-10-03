import { DataTypes, Deferrable } from './_helpers'

const fields = {
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
    allownull: false,
    onDelete: 'restrict',
    onUpdate: 'cascade',
    references: {
      model: 'wip_jurisdiction',
      key: 'id',
      deferrable: Deferrable.INITIALLY_DEFERRED,
    },
    unique: 'wip_jurisdiction_id-urltype_id',
  },
  urlTypeId: {
    type: DataTypes.INTEGER,
    field: 'urltype_id',
    allownull: false,
    onDelete: 'restrict',
    onUpdate: 'cascade',
    references: {
      model: 'urltype',
      key: 'id',
      deferrable: Deferrable.INITIALLY_DEFERRED,
    },
    unique: 'wip_jurisdiction_id-urltype_id',
  },
  url: {
    type: DataTypes.TEXT,
    field: 'url',
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
    field: 'name',
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    field: 'description',
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
