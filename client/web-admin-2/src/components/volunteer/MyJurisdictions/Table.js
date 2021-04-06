import React, { useMemo } from 'react'
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
    render: (status) => (
      <JurisdictionStatus status={status} />
    ),
    sort: true,
  },
  {
    render: (_, { id }) => <SelectButton to={id} />,
    textAlign: 'center',
  },
]

const JurisdictionsTable = ({ jurisdictions }) => {
  const data = useMemo(() => {
    if (!jurisdictions) return null

    return jurisdictions.map((j) => ({
      id: j.id,
      jurisdictionName: j.name,
      stateName: j.state.name,
      jurisdictionStatus: j.jurisdictionStatus,
    }))
  }, [jurisdictions])

  return <Table data={data} columns={COLUMNS} />
}

export default JurisdictionsTable
