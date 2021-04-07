import React from 'react'
import JurisdictionStatus from 'components/core/JurisdictionStatus'
import Table from 'components/core/Table'
import SelectButton from 'components/core/SelectButton'

const COLUMNS = [
  {
    title: 'Jurisdiction',
    field: 'jurisdictionName',
    sort: true,
  },
  {
    title: 'State',
    field: 'stateName',
    sort: true,
  },
  {
    title: 'Status',
    field: 'jurisdictionStatus',
    render: (status) => <JurisdictionStatus status={status} />,
    sort: true,
  },
  {
    render: (_, { jurisdictionId: id }) => <SelectButton to={id} />,
    textAlign: 'center',
  },
]

const JurisdictionsTable = ({ jurisdictions }) => {
  return (
    <Table
      data={jurisdictions}
      columns={COLUMNS}
      keyExtractor={(jurisdiction) => jurisdiction.jurisdictionId}
    />
  )
}

export default JurisdictionsTable
