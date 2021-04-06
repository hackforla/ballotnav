import React, { useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from 'components/core/Tabs'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    marginBottom: '0.5em',
    borderBottom: '1px #D6D6D6 solid',
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%',
  },
}))

const FILTERS = [
  {
    title: 'Not Assigned',
    filter: (jdxs) => jdxs.filter((j) => j.userJurisdictions.length === 0)
  },
  {
    title: 'Assigned',
    filter: (jdxs) => jdxs.filter((j) => j.userJurisdictions.length > 0)
  },
]

const Jurisdictions = ({ jurisdictions }) => {
  const classes = useStyles()
  const [activeFilter, setActiveFilter] = useState(FILTERS[0])

  const filteredJurisdictions = useMemo(() => {
    return activeFilter.filter(jurisdictions)
  }, [activeFilter, jurisdictions])

  console.log('length:', filteredJurisdictions.length)

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Tabs
          tabs={FILTERS}
          activeTab={activeFilter}
          onChange={setActiveFilter}
          renderTitle={(filter) => filter.title}
        />
        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>Search</div>
      </div>
    </div>
  )
}

export default Jurisdictions
