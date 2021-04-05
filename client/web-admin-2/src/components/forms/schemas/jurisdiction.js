import * as Yup from 'yup'

const schema = {
  name: {
    validate: Yup.string().required(),
    input: { label: 'Name', variant: 'outlined' },
  },
  authorityName: {
    validate: Yup.string(),
    input: { label: 'Authority Name', variant: 'outlined' },
  },
  mailAddress1: {
    validate: Yup.string(),
    input: { label: 'Address 1', variant: 'outlined' },
  },
  mailAddress2: {
    validate: Yup.string(),
    input: { label: 'Address 2', variant: 'outlined' },
  },
  mailAddress3: {
    validate: Yup.string(),
    input: { label: 'Address 3', variant: 'outlined' },
  },
  internalNotes: {
    validate: Yup.string(),
    input: {
      label: 'Internal Notes',
      type: 'textarea',
      multiline: true,
      rows: 7,
      variant: 'outlined',
    },
  },
}

export default schema
