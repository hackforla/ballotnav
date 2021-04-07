import React from 'react'
import JurisdictionStatus from 'components/core/JurisdictionStatus'
import Table from 'components/core/Table'
import SelectButton from 'components/core/SelectButton'
import { useRole } from 'store/selectors'

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

const EXTRA_ADMIN_COLUMNS = [
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
]

const WipTable = ({ wips }) => {
  const { isAdmin } = useRole()

  const columns = [ ...COLUMNS ]
  if (isAdmin) columns.splice(2, 0, ...EXTRA_ADMIN_COLUMNS)

  return (
    <Table
      data={wips}
      columns={columns}
      keyExtractor={(j) => j.jurisdictionId}
    />
  )
}

export default WipTable
