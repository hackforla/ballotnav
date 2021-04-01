import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { useMyJurisdictions } from 'store/selectors'

const useStyles = makeStyles((theme) => ({
  root: {},
  heading: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
  },
  jurisdictions: {
    marginTop: '3em',
  },
  jurisdiction: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0.5em 0',
    '& > *:not(:last-child)': {
      marginRight: '2em',
    }
  },
}))

const MyJurisdictions = () => {
  const classes = useStyles()
  const jurisdictions = useMyJurisdictions()

  return (
    <div className={classes.root}>
      <h1 className={classes.heading}>My Jurisdictions</h1>
      <div className={classes.jurisdictions}>
        {jurisdictions && jurisdictions.map((juris, index) => (
          <div key={juris.id} className={classes.jurisdiction}>
            <span>{ juris.name }</span>
            <span>{ juris.state.name }</span>
            <span>{ juris.jurisdictionStatus }</span>
            <Link to={`/jurisdiction/${juris.id}`}>
              Select
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyJurisdictions
