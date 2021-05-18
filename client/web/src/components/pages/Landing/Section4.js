import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CodeForAmericaIcon from 'assets/brigade-icons/code-for-america.svg'
import HackForLaIcon from 'assets/brigade-icons/hack-for-la.svg'
import CodeForSanJoseIcon from 'assets/brigade-icons/code-for-san-jose.svg'
import CodeForAtlIcon from 'assets/brigade-icons/code-for-atl.svg'
import OpenOaklandIcon from 'assets/brigade-icons/open-oakland.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '3rem',
  },
  top: {
    width: '91%',
  },
  heading: {
    fontWeight: 700,
    fontSize: 49,
    lineHeight: '45px',
  },
  message: {
    marginTop: '4rem',
    fontWeight: 400,
    fontSize: 30,
    lineHeight: '42px',
    marginBottom: '1em',
  },
  bottom: {
    height: '7rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '2em',
  },
}))

const Section4 = () => {
  const classes = useStyles()

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
