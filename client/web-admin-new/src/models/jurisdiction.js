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
  geojson: {
    type: DataTypes.TEXT,
    field: 'geojson',
    allowNull: true,
  },
  fipsCategory: {
    type: DataTypes.TEXT,
    field: 'fips_category',
    allowNull: true,
  },
  fipsCountyCode: {
    type: DataTypes.TEXT,
    field: 'fips_county_code',
    allowNull: true,
  },
  fipsCountyNumber: {
    type: DataTypes.INTEGER,
    field: 'fips_county_number',
    allowNull: true,
  },
  fipsCompleteCountyCode: {
    type: DataTypes.TEXT,
    field: 'fips_complete_county_code',
    allowNull: true,
  },
  fipsCompleteCountyNumber: {
    type: DataTypes.INTEGER,
    field: 'fips_complete_county_number',
    allowNull: true,
  },
  fipsCountySubCode: {
    type: DataTypes.TEXT,
    field: 'fips_county_sub_code',
    allowNull: true,
  },
  fipsPlaceCode: {
    type: DataTypes.TEXT,
    field: 'fips_place_code',
    allowNull: true,
  },
  fipsConsCityCode: {
    type: DataTypes.TEXT,
    field: 'fips_cons_city_code',
    allowNull: true,
  },
  wipJurisdictionId: {
    type: DataTypes.INTEGER,
    field: 'wip_jurisdiction_id',
    allownull: true,
    comment:
      'Set to the WIP ID most recently published. This should be constrained to wip_jurisdiction.id, but sequelize does not understand cyclic dependencies.',
  },
}

export default fields
