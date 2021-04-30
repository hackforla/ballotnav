import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ballotNavLogo from 'assets/logos/ballotnav.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1.5em 0 0.5em'
  },
}))

const Header = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <img src={ballotNavLogo} />
    </div>
  )
}

export default Header
