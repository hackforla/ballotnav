import { DataTypes, Deferrable } from './_helpers'

const fields = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    field: 'id',
    primaryKey: true,
  },
  stateId: {
    type: DataTypes.INTEGER,
    field: 'state_id',
    allownull: false,
    onDelete: 'restrict',
    onUpdate: 'cascade',
    references: {
      model: 'state',
      key: 'id',
      deferrable: Deferrable.INITIALLY_DEFERRED,
    },
  },
  name: {
    type: DataTypes.TEXT,
    field: 'name',
    allowNull: false,
  },
  abbreviation: {
    type: DataTypes.TEXT,
    field: 'abbreviation',
    allowNull: false,
  },
  authorityName: {
    type: DataTypes.TEXT,
    field: 'authority_name',
  },
  jurisdictionType: {
    type: DataTypes.ENUM(
      'County',
      'Parish',
      'County or City',
      'City or Township',
      'Municipality',
      'Town or City'
    ),
    field: 'jurisdiction_type',
    allowNull: false,
    defaultValue: 'County',
  },
  internalNotes: {
    type: DataTypes.TEXT,
    field: 'internal_notes',
  },
  isLateRegistrationPossible: {
    type: DataTypes.ENUM('Y', 'N', 'U'),
    field: 'is_late_registration_possible',
    allowNull: false,
    defaultValue: 'U',
  },
  voterRegistrationAuthority: {
    type: DataTypes.ENUM('state', 'jurisdiction'),
    field: 'voter_registration_authority',
    allowNull: false,
    defaultValue: 'jurisdiction',
  },
  stateType: {
    type: DataTypes.ENUM('State', 'Commonwealth', 'Federal District'),
    field: 'state_type',
    allowNull: false,
    defaultValue: 'State',
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
  geoJSON: {
    type: DataTypes.TEXT,
    field: 'geojson',
  },
  jurisdictionalWarning: {
    type: DataTypes.TEXT,
    field: 'jurisdictional_warning',
  },
  editBasisWipStateId: {
    type: DataTypes.INTEGER,
    field: 'edit_basis_wip_state_id',
    allowNull: true,
    comment:
      'This should be constrained to wip_jurisdiction.id (to identify the origin of this data) but sequelize does not understand cyclic dependencies',
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
