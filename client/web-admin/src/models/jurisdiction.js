import { DataTypes, Deferrable } from './_helpers'

const fields = {
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
    onDelete: 'restrict',
    onUpdate: 'cascade',
    references: {
      model: 'jurisdiction',
      key: 'id',
      deferrable: Deferrable.INITIALLY_DEFERRED,
    },
  },
  editBasisWipJurisdictionId: {
    type: DataTypes.INTEGER,
    field: 'edit_basis_wip_jurisdiction_id',
    allowNull: true,
    comment:
      'This should be constrained to wip_jurisdiction.id (to identify the origin of this data) but sequelize does not understand cyclic dependencies',
  },
  name: {
    type: DataTypes.TEXT,
    field: 'name',
    allowNull: false,
  },
  authorityName: {
    type: DataTypes.TEXT,
    field: 'authority_name',
    allowNull: true,
  },
  mailAddress1: {
    type: DataTypes.TEXT,
    field: 'mail_address1',
    allowNull: true,
  },
  mailAddress2: {
    type: DataTypes.TEXT,
    field: 'mail_address2',
    allowNull: true,
  },
  mailAddress3: {
    type: DataTypes.TEXT,
    field: 'mail_address3',
    allowNull: true,
  },
  isNotValid: {
    type: DataTypes.BOOLEAN,
    field: 'is_not_valid',
    allowNull: false,
    defaultValue: false,
  },
  internalNotes: {
    type: DataTypes.TEXT,
    field: 'internal_notes',
    allowNull: true,
  },
  timezoneDefault: {
    type: DataTypes.TEXT,
    field: 'timezone_default',
  },
  timezoneEnforced: {
    type: DataTypes.BOOLEAN,
    field: 'timezone_enforced',
    allowNull: false,
    defaultValue: false,
  },
  editorUserId: {
    type: DataTypes.INTEGER,
    field: 'editor_user_id',
    allowNull: true,
    onDelete: 'restrict',
    onupdate: 'cascade',
    reference: {
      model: 'user',
      key: 'id',
      deferrable: Deferrable.INITIALLY_DEFERRED,
    },
  },
  editorComments: {
    type: DataTypes.TEXT,
    field: 'editor_comments',
    allowNull: true,
  },
  isReleased: {
    type: DataTypes.BOOLEAN,
    field: 'is_released',
    allowNull: false,
    defaultValue: false,
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
