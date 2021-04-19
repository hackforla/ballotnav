import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '0.5em',
    borderRadius: '0.5em',
    fontSize: 16,
    fontWeight: 700,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
    zIndex: 100,
  },
}))

const RegionName = ({ regionName }) => {
  const classes = useStyles()

  if (!regionName) return null
  return (
    <div className={classes.root}>
      { regionName }
    </div>
  )
}

export default RegionName
