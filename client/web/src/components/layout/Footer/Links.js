import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import hackForLALogo from 'assets/logos/hack-for-la.svg'
import twitterLogo from 'assets/logos/twitter.svg'
import facebookLogo from 'assets/logos/facebook.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  hackForLA: {
    width: '5em',
    marginRight: '3em',
  },
  twitter: {
    width: '2em',
    marginRight: '3em',
  },
  facebook: {
    width: '1em',
  },
}))

const Links = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <a
        href="https://www.hackforla.org"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className={classes.hackForLA}
          id="hack-for-LA-logo"
          src={hackForLALogo}
          alt="Hack for LA logo"
        />
      </a>
      <a
        href="https://twitter.com/BallotNav"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className={classes.twitter}
          src={twitterLogo}
          alt="Twitter logo"
        />
      </a>
      <a
        href="https://www.facebook.com/BallotNav/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className={classes.facebook}
          src={facebookLogo}
          alt="Facebook logo"
        />
      </a>
    </div>
  )
}

export default Links
