import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import JurisdictionStatus from 'components/Dashboard/core/JurisdictionStatus'
import Table from 'components/Dashboard/core/Table'
import Button from '@material-ui/core/button'

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
    sort: (a, b) => a.jurisdictionName > b.jurisdictionName ? 1 : -1,
  },
  {
    title: 'State',
    field: 'stateName',
  },
  {
    title: 'Status',
    renderValue: (record) => (
      <JurisdictionStatus status={record.jurisdictionStatus} />
    ),
  },
  {
    title: '',
    renderValue: (record) => (
      <Link to={`/jurisdiction/${record.id}`}>
        <Button
          color='primary'
          variant='contained'
          style={{
            textTransform: 'none',
            fontWeight: 700,
            fontSize: 12,
            borderRadius: '1.5em',
            padding: '0.25em 3em'
          }}
        >
          Select
        </Button>
      </Link>
    )
  },
]

const JurisdictionsTable = ({ jurisdictions }) => {
  const classes = useStyles()

  const tableData = useMemo(() => {
    if (!jurisdictions) return []

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
