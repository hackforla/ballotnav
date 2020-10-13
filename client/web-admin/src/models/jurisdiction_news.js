import { DataTypes } from './_helpers'

const fields = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    field: 'id',
    primaryKey: true,
  },
  // wipJurisdictionId: {
  //   type: DataTypes.INTEGER,
  //   field: 'wip_jurisdiction_id',
  //   allownull: false,
  //   onDelete: 'restrict',
  //   onUpdate: 'cascade',
  //   references: {
  //     model: 'wip_jurisdiction',
  //     key: 'id',
  //     deferrable: Deferrable.INITIALLY_DEFERRED,
  //   },
  // },
  datePosted: {
    type: 'date',
    field: 'date_posted',
    allowNull: false,
  },
  caption: {
    type: 'textarea',
    field: 'caption',
    allowNull: false,
  },
  url: {
    type: 'text',
    field: 'url',
    allowNull: false,
  },
  summary: {
    type: 'textarea',
    field: 'summary',
    allowNull: true,
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
