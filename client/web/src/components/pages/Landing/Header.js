import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ballotNavLogo from 'assets/logos/ballotnav.svg'

const useStyles = makeStyles((theme) => ({
  root: {},
  hero: {
    marginTop: '3rem',
    // marginRight: '6rem',
    width: '17%',
  },
}))

const Header = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <img className={classes.hero} src={ballotNavLogo} alt="ballotNav logo" />
    </div>
  )
}

export default Header
