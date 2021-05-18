import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useBreakpoints from 'hooks/useBreakpoints'
import CodeForAmericaIcon from 'assets/brigade-icons/code-for-america.svg'
import HackForLaIcon from 'assets/brigade-icons/hack-for-la.svg'
import CodeForSanJoseIcon from 'assets/brigade-icons/code-for-san-jose.svg'
import CodeForAtlIcon from 'assets/brigade-icons/code-for-atl.svg'
import OpenOaklandIcon from 'assets/brigade-icons/open-oakland.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: ({ isDesktop }) => (isDesktop ? '3rem' : '1em'),
  },
  top: {
    width: '91%',
  },
  heading: {
    fontWeight: 700,
    fontSize: 39,
  },
  message: {
    marginTop: '2rem',
    fontWeight: 400,
    fontSize: 24,
    lineHeight: '33px',
    marginBottom: '1em',
  },
  bottom: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '3em',
  },
}))

const Section4 = () => {
  const { isDesktop } = useBreakpoints()
  const classes = useStyles({ isDesktop })

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <h1 className={classes.heading}>Who is making BallotNav?</h1>
        <p className={classes.message}>
          BallotNav is an all-volunteer project initiated by Hack for LA and
          supported by brigades across the Code for America network.
        </p>
      </div>
      <div className={classes.bottom}>
        <a href="https://www.codeforamerica.org/about-us">
          <img src={CodeForAmericaIcon} alt="Code for America Icon" />
        </a>
        <a href="https://www.hackforla.org/projects/ballot-nav">
          <img src={HackForLaIcon} alt="Hack for LA Icon" />
        </a>
        <a href="https://www.codeforsanjose.org/about.html">
          <img src={CodeForSanJoseIcon} alt="Code for San Jose Icon" />
        </a>
        <a href="https://www.codeforatlanta.org/">
          <img src={CodeForAtlIcon} alt="Code for Atlanta Icon" />
        </a>
        <a href="https://openoakland.org/about-us/">
          <img src={OpenOaklandIcon} alt="Open Oakland Icon" />
        </a>
      </div>
    </div>
  )
}

export default Section4
