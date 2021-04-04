import React, { useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useMyJurisdictions } from 'store/selectors'
import useVolunteerActions from 'store/actions/volunteer'
import LastUpdated from 'components/core/LastUpdated'
import Search from './Search'
import Table from './Table'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2.5em',
    height: '3em',
  },
  title: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    fontSize: 24,
  },
}))

const MyJurisdictions = () => {
  const classes = useStyles()
  const [filter, setFilter] = useState('')
  const myJurisdictions = useMyJurisdictions()
  const { getMyJurisdictions } = useVolunteerActions()

  const filteredJurisdictions = useMemo(() => {
    const cleanFilter = filter.trim()

    if (cleanFilter.length < 2) return myJurisdictions
    return myJurisdictions.filter((j) => {
      const regex = new RegExp(cleanFilter, 'i')
      return regex.test(j.name) || regex.test(j.state.name)
    })
  }, [filter, myJurisdictions])

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1 className={classes.title}>My Jurisdictions</h1>
        <LastUpdated
          updatedAt={Date.now()}
          onUpdate={getMyJurisdictions}
        />
      </div>
      <Search value={filter} onChange={setFilter} />
      <Table jurisdictions={filteredJurisdictions} />
    </div>
  )
}

export default MyJurisdictions
