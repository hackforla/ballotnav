import React, { useState, useMemo, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from 'components/core/Tabs'
import SearchBox from 'components/core/SearchBox'
import Table from 'components/core/Table'
import LinkButton from 'components/core/LinkButton'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    marginBottom: '0.5em',
    borderBottom: '1px #D6D6D6 solid',
    display: 'flex',
    alignItems: 'flex-end',
  },
  tabs: {
    flex: 1,
  },
  searchBox: {
    width: 300,
  },
}))

const ASSIGN_FILTERS = [
  {
    title: 'Not Assigned',
    filter: (jdxs) => jdxs.filter((j) => j.userJurisdictions.length === 0),
  },
  {
    title: 'Assigned',
    filter: (jdxs) => jdxs.filter((j) => j.userJurisdictions.length > 0),
  },
]

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
    render: (_, { id }) => <LinkButton label="Select" disabled to={id} />,
    textAlign: 'center',
  },
]

const Jurisdictions = ({ jurisdictions }) => {
  const classes = useStyles()
  const [assignFilter, setAssignFilter] = useState(ASSIGN_FILTERS[0])
  const [textFilter, setTextFilter] = useState('')

  // reset text filter when assigned filter changes
  useEffect(() => setTextFilter(''), [assignFilter])

  const filteredJurisdictions = useMemo(() => {
    let filtered

    // apply assignment filter
    filtered = assignFilter.filter(jurisdictions)

    // apply text filter
    const cleanTextFilter = textFilter.trim()
    if (cleanTextFilter.length < 2) return filtered
    filtered = filtered.filter((j) => {
      const regex = new RegExp(cleanTextFilter, 'i')
      return regex.test(j.jurisdictionName) || regex.test(j.stateName)
    })

    return filtered
  }, [assignFilter, textFilter, jurisdictions])

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.tabs}>
          <Tabs
            tabs={ASSIGN_FILTERS}
            activeTab={assignFilter}
            onChange={setAssignFilter}
            renderTitle={(filter) => filter.title}
          />
        </div>
        <div className={classes.searchBox}>
          <SearchBox
            value={textFilter}
            onChange={setTextFilter}
            placeholder="Filter by jurisdiction or state name"
          />
        </div>
      </div>
      <Table data={filteredJurisdictions} columns={COLUMNS} />
    </div>
  )
}

export default Jurisdictions
