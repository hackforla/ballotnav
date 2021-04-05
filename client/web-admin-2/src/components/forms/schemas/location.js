import * as Yup from 'yup'
import { YNU_OPTIONS } from './_common'

const schema = {
  name: {
    validate: Yup.string().required(),
    input: { label: 'Name' },
  },
  address1: {
    validate: Yup.string(),
    input: { label: 'Address 1' },
  },
  address2: {
    validate: Yup.string(),
    input: { label: 'Address 2' },
  },
  address3: {
    validate: Yup.string(),
    input: { label: 'Address 3' },
  },
  city: {
    validate: Yup.string(),
    input: { label: 'City' },
  },
  zip: {
    validate: Yup.string(),
    input: { label: 'ZIP' },
  },
  contactName: {
    validate: Yup.string(),
    input: { label: 'Contact Name' },
  },
  contactPhone: {
    validate: Yup.string(),
    input: { label: 'Contact Phone' },
  },
  contactEmail: {
    validate: Yup.string().email(),
    input: { label: 'Contact Email' },
  },
  isDriveup: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
  },
  isDropBox: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
  },
  isEarlyDropoffLocation: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
  },
  isEarlyVotingLocation: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
  },
  isElectionsOffice: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
  },
  isHandicapAccessible: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
  },
  isOutdoors: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
  },
  isPollingLocation: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
  },
  isStaffedLocation: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
  },
}

export default schema
