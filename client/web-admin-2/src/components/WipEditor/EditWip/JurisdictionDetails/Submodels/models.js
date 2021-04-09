import LinkButton from 'components/core/LinkButton'
import LocationCheckboxes from './LocationCheckboxes'
import { phoneNumberTypes, importantDateTypes } from 'const'

const EditButton = ({ to }) => (
  <LinkButton to={to} label='Edit' variant='outlined' />
)

const models = [
  {
    title: 'Locations',
    field: 'locations',
    columns: [
      {
        title: 'Location name',
        field: 'name',
        sort: true,
      },
      {
        title: 'City',
        field: 'city',
        sort: true,
      },
      {
        title: 'Contact name',
        field: 'contactName',
        sort: true,
      },
      {
        title: 'Contact phone',
        field: 'contactPhone',
      },
      {
        title: 'Contact email',
        field: 'contactEmail',
      },
      {
        render: (_, { id }) => <EditButton to={`locations/${id}`} />,
        textAlign: 'center',
      },
    ],
    collapse: (location) => <LocationCheckboxes location={location} />,
  },
  {
    title: 'Phones',
    field: 'phones',
    columns: [
      {
        title: 'Phone Number Type',
        field: 'phoneNumberTypeId',
        render: (phoneNumberTypeId) => phoneNumberTypes[phoneNumberTypeId],
        sort: true,
      },
      {
        title: 'Phone Number',
        field: 'phoneNumber',
      },
      {
        title: 'Description',
        field: 'description',
      },
      {
        title: 'Sort Order',
        field: 'sortOrder',
      },
      {
        render: (_, { id }) => <EditButton to={`phones/${id}`} />,
        textAlign: 'center',
      },
    ],
  },
  {
    title: 'Important Dates',
    field: 'importantDates',
    columns: [
      {
        title: 'Important Date Type',
        field: 'importantDateTypeId',
        render: (importantDateTypeId) =>
          importantDateTypes[importantDateTypeId],
        sort: true,
      },
      {
        title: 'Note',
        field: 'note',
      },
      {
        render: (_, { id }) => <EditButton to={`importantDates/${id}`} />,
        textAlign: 'center',
      },
    ],
  },
]

export default models
