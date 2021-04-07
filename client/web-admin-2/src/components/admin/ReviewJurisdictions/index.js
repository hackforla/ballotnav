import React, { useEffect, useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useAdminActions from 'store/actions/admin'
import { useReleasedJurisdictions } from 'store/selectors'
import SearchBox from 'components/core/SearchBox'
import LastUpdated from 'components/core/LastUpdated'
import Table from './Table'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '6em',
  },
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
  searchBox: {
    borderBottom: '1px #d6d6d6 solid',
    marginBottom: '0.5em',
  },
}))

const ReviewJurisdictions = () => {
  const classes = useStyles()
  const releasedJurisdictions = useReleasedJurisdictions()
  const { listReleasedJurisdictions } = useAdminActions()
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if (!releasedJurisdictions) listReleasedJurisdictions()
  }, [releasedJurisdictions, listReleasedJurisdictions])

  const filteredJurisdictions = useMemo(() => {
    if (!releasedJurisdictions) return null

    const cleanFilter = filter.trim()
    if (cleanFilter.length < 2) return releasedJurisdictions
    return releasedJurisdictions.filter((j) => {
      const regex = new RegExp(cleanFilter, 'i')
      return (
        regex.test(j.jurisdictionName) ||
        regex.test(j.stateName) ||
        regex.test(j.editorName) ||
        regex.test(j.editorSlackName)
      )
    })
  }, [filter, releasedJurisdictions])

  if (!filteredJurisdictions) return null
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1 className={classes.title}>Review Jurisdictions</h1>
        <LastUpdated
          updatedAt={Date.now()}
          onUpdate={listReleasedJurisdictions}
        />
      </div>
      <div className={classes.searchBox}>
        <SearchBox
          value={filter}
          onChange={setFilter}
          placeholder="Filter by jurisdiction, state, or volunteer"
        />
      </div>
      <Table jurisdictions={filteredJurisdictions} />
    </div>
  )
}

export default ReviewJurisdictions
