import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RefreshIcon from '@material-ui/icons/Autorenew'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: '#949494',
    fontWeight: 400,
    fontSize: 12,
  },
  lastUpdated: {
    fontWeight: 700,
    display: 'inline-block',
    margin: '0 0.5em',
  },
}))

const LastUpdated = ({ updatedAt, onUpdate }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <span>Last update:</span>
      <span className={classes.lastUpdated}>
        { updatedAt }
      </span>
      <IconButton size='small' onClick={onUpdate}>
        <RefreshIcon color='primary' style={{ fontSize: 28 }} />
      </IconButton>
    </div>
  )
}

export default LastUpdated
