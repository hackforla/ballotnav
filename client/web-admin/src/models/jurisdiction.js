import { DataTypes } from './_helpers'

const fields = {
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
  internalNotes: {
    type: 'textarea',
    field: 'internal_notes',
    allowNull: true,
  },
}

export default fields
