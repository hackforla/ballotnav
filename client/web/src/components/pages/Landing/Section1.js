import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import LaptopHero from 'assets/images/about-hero.svg'
import useBreakpoints from 'hooks/useBreakpoints'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: ({ isDesktop }) => (isDesktop ? '6em' : '3em'),
    display: 'flex',
  },
  left: {
    width: ({ isDesktop }) => (isDesktop ? '50%' : '100%'),
    display: 'flex',
    flexDirection: 'column',
  },
  right: {
    flex: 1,
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
    lineHeight: '32px',
    width: ({ isDesktop }) => (isDesktop ? '80%' : '100%'),
  },
  button: {
    marginTop: '4rem',
    borderRadius: '3em',
    padding: '1em 3em',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: 20,
    alignSelf: ({ isDesktop }) => (isDesktop ? 'flex-start' : 'center'),
  },
  hero: {
    width: '100%',
    marginTop: '3rem',
    marginLeft: ({ isDesktop }) => (isDesktop ? '2rem' : 0),
    position: 'relative',
    left: ({ isDesktop }) => (isDesktop ? '8%' : 0),
  },
}))

const Section1 = () => {
  const { isDesktop, isMobile } = useBreakpoints()
  const classes = useStyles({ isDesktop })

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <h1 className={classes.heading}>
          BallotNav is Validating Information for Future Elections.
        </h1>
        <p className={classes.message}>
          BallotNav helps voters find safe, secure, in-person locations to drop
          off your mail-in or absentee ballot. Launch our demo to navigate
          BallotNav.
        </p>
        {isMobile && (
          <img className={classes.hero} src={LaptopHero} alt="Laptop Icon" />
        )}
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          href="https://demo.ballotnav.org"
        >
          Launch the Demo!
        </Button>
      </div>
      {isDesktop && (
        <div className={classes.right}>
          <img className={classes.hero} src={LaptopHero} alt="Laptop Icon" />
        </div>
      )}
    </div>
  )
}

export default Section1
