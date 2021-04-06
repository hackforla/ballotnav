import React from 'react'
import Table from 'components/core/Table'
import JurisdictionStatus from 'components/core/JurisdictionStatus'
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
    title: 'Volunteer',
    field: 'editorName',
    sort: true,
  },
  {
    title: 'Slack',
    field: 'editorSlackName',
    sort: true,
  },
  {
    title: 'Status',
    field: 'jurisdictionStatus',
    render: (status) => (
      <JurisdictionStatus status={status} />
    ),
    sort: true,
  },
  {
    render: (_, { wipJurisdictionId }) => <SelectButton to={wipJurisdictionId} />,
    textAlign: 'center',
  },
]

const JurisdictionsTable = ({ jurisdictions }) => {
  return (
    <Table
      data={jurisdictions}
      columns={COLUMNS}
      keyExtractor={(j) => j.wipJurisdictionId}
    />
  )
}

export default JurisdictionsTable
