import * as Yup from 'yup'

const schema = {
  name: {
    validate: Yup.string().required(),
    input: { label: 'Name' },
  },
  authorityName: {
    validate: Yup.string(),
    input: { label: 'Authority Name' },
  },
  mailAddress1: {
    validate: Yup.string(),
    input: { label: 'Address 1' },
  },
  mailAddress2: {
    validate: Yup.string(),
    input: { label: 'Address 2' },
  },
  mailAddress3: {
    validate: Yup.string(),
    input: { label: 'Address 3' },
  },
  internalNotes: {
    validate: Yup.string(),
    input: {
      label: 'Internal Notes',
      type: 'textarea',
      multiline: true,
      rows: 7,
    },
  },
}

export default schema
