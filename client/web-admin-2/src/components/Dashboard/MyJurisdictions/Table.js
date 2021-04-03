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
    sort: (a, b) => b.jurisdictionName > a.jurisdictionName ? 1 : -1,
  },
  {
    title: 'State',
    field: 'stateName',
    sort: (a, b) => b.stateName > a.stateName ? 1 : -1,
  },
  {
    title: 'Status',
    renderValue: ({ jurisdictionStatus }) => (
      <JurisdictionStatus status={jurisdictionStatus} />
    ),
    sort: (a, b) => b.jurisdictionStatus > a.jurisdictionStatus ? 1 : -1,
  },
  {
    title: '',
    renderValue: ({ id }) => (
      <Link to={`/jurisdiction/${id}`}>
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
