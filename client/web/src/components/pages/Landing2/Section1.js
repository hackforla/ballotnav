import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import LaptopHero from 'assets/images/about-hero.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    // outline: '3px green solid',
    marginTop: '2em',
    display: 'flex',
  },
  left: {
    width: '50%',
    height: '100%',
    paddingRight: '1em',
  },
  right: {
    width: '50%',
    height: '100%',
  },
  heading: {
    fontWeight: 700,
    fontSize: 33,
    lineHeight: '45px',
  },
  message: {
    marginTop: '2em',
    fontWeight: 400,
    fontSize: 24,
    lineHeight: '33px',
  },
  button: {
    marginTop: '2em',
    borderRadius: '3em',
    padding: '1em 2em',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: 20,
  },
  hero: {
    width: '100%',
    marginTop: '3em',
  },
}))

const Section1 = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <h1 className={classes.heading}>BallotNav is Validating <br /> Information for Future Elections. </h1>
        <p className={classes.message}>
          BallotNav helps voters find safe, secure, in-person locations to drop
          off your mail-in or absentee ballot. Launch our demo to navigate
          BallotNav.
        </p>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          href="https://demo.ballotnav.org"
        >
          Launch the Demo!
        </Button>
      </div>
      <div className={classes.right}>
        <img src={LaptopHero} />
      </div>
    </div>
  )
}

export default Section1
