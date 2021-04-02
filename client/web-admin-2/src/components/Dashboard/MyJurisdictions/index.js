import React, { useState, useMemo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { useMyJurisdictions } from 'store/selectors'
import { getMyJurisdictions } from 'store/actions/volunteer'
import LastUpdated from 'components/Dashboard/core/LastUpdated'
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
  },
}))

const MyJurisdictions = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('')
  const jurisdictions = useMyJurisdictions()

  const filteredJurisdictions = useMemo(() => {
    const cleanFilter = filter.trim()

    if (cleanFilter.length < 2) return jurisdictions
    return jurisdictions.filter((j) => {
      const regex = new RegExp(cleanFilter, 'i')
      return regex.test(j.name) || regex.test(j.state.name)
    })
  }, [filter, jurisdictions])

  const updateJurisdictions = useCallback(() => {
    dispatch(getMyJurisdictions())
  }, [dispatch])

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1 className={classes.title}>My Jurisdictions</h1>
        <LastUpdated
          updatedAt={Date.now()}
          onUpdate={updateJurisdictions}
        />
      </div>
      <Search value={filter} onChange={setFilter} />
      <Table jurisdictions={filteredJurisdictions} />
    </div>
  )
}

export default MyJurisdictions
