import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import JurisdictionStatus from 'components/core/JurisdictionStatus'
import Table from 'components/core/Table'
import SelectButton from 'components/core/SelectButton'

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0.5em 0',
    '& > *:not(:last-child)': {
      marginRight: '2em',
    }
  },
}))

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
  const classes = useStyles()

  const tableData = useMemo(() => {
    if (!jurisdictions) return null

    return jurisdictions.map((j) => ({
      id: j.id,
      jurisdictionName: j.name,
      stateName: j.state.name,
      jurisdictionStatus: j.jurisdictionStatus,
    }))
  }, [jurisdictions])

  return (
    <div className={classes.root}>
      <Table data={tableData} columns={COLUMNS} />
    </div>
  )
}

export default JurisdictionsTable
