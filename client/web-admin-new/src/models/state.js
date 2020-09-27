import { DataTypes, Deferrable } from './_helpers'

const fields = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    field: 'id',
    primaryKey: true,
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
  fipsCode: {
    type: DataTypes.TEXT,
    field: 'fips_code',
  },
  fipsNumber: {
    type: DataTypes.INTEGER,
    field: 'fips_number',
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
  geoJSON: {
    type: DataTypes.TEXT,
    field: 'geojson',
  },
  wipStateId: {
    type: DataTypes.INTEGER,
    field: 'wip_state_id',
    allownull: true,
    comment:
      'Set to the WIP ID most recently published. This should be constrained to wip_state.id, but sequelize does not understand cyclic dependencies.',
  },
}

export default fields
