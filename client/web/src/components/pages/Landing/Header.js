import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useBreakpoints from 'hooks/useBreakpoints'
import ballotNavLogo from 'assets/logos/ballotnav.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '1rem',
  },
  hero: {
    width: ({ isDesktop }) => (isDesktop ? 188 : 140),
  },
}))

const Header = () => {
  const { isDesktop } = useBreakpoints()
  const classes = useStyles({ isDesktop })

  return (
    <div className={classes.root}>
      <img className={classes.hero} src={ballotNavLogo} alt="ballotNav logo" />
    </div>
  )
}

export default Header
