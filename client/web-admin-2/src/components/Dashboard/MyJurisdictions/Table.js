import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

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

const Table = ({ jurisdictions }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {jurisdictions && jurisdictions.map((juris, index) => (
        <div key={juris.id} className={classes.row}>
          <span>{ juris.name }</span>
          <span>{ juris.state.name }</span>
          <span>{ juris.jurisdictionStatus }</span>
          <Link to={`/jurisdiction/${juris.id}`}>
            Select
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Table
