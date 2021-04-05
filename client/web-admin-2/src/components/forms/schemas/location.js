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
    defaultValue: 'U',
  },
  isDropBox: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
    defaultValue: 'U',
  },
  isEarlyDropoffLocation: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
    defaultValue: 'U',
  },
  isEarlyVotingLocation: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
    defaultValue: 'U',
  },
  isElectionsOffice: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
    defaultValue: 'U',
  },
  isHandicapAccessible: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
    defaultValue: 'U',
  },
  isOutdoors: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
    defaultValue: 'U',
  },
  isPollingLocation: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
    defaultValue: 'U',
  },
  isStaffedLocation: {
    validate: Yup.string(),
    input: {
      select: true,
      options: YNU_OPTIONS,
    },
    defaultValue: 'U',
  },
  scheduleType: {
    validate: Yup.string(),
    input: {
      select: true,
      options: [
        { value: 'description', label: 'Description' },
        { value: 'hours', label: 'Hours' },
        { value: 'continuous', label: 'Continuous' },
      ]
    },
    defaultValue: 'description',
  },
}

export default schema
