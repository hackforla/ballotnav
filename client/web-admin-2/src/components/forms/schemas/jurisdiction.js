import * as Yup from 'yup'

const schema = [
  {
    field: 'name',
    validate: Yup.string().required(),
    input: { label: 'Name' },
  },
  {
    field: 'authorityName',
    validate: Yup.string(),
    input: { label: 'Authority Name' },
  },
  {
    field: 'mailAddress1',
    validate: Yup.string(),
    input: { label: 'Address 1' },
  },
  {
    field: 'mailAddress2',
    validate: Yup.string(),
    input: { label: 'Address 2' },
  },
  {
    field: 'mailAddress3',
    validate: Yup.string(),
    input: { label: 'Address 3' },
  },
  {
    field: 'internalNotes',
    validate: Yup.string(),
    input: {
      label: 'Internal Notes',
      type: 'textarea',
      multiline: true,
      rows: 7,
    },
  },
]

export default schema
