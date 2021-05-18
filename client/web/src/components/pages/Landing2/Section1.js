import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import LaptopHero from 'assets/images/about-hero.svg'
import useBreakpoints from 'hooks/useBreakpoints'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '8em',
    display: 'flex',
  },
  left: {
    width: ({ isDesktop }) => (isDesktop ? '54%' : '100%'),
    // paddingRight: '1em',
    display: 'flex',
    flexDirection: 'column',
  },
  right: {
    width: '61%',
  },
  heading: {
    fontWeight: 700,
    fontSize: 41,
    lineHeight: '52px',
  },
  message: {
    marginTop: '2em',
    fontWeight: 400,
    fontSize: 30,
    lineHeight: '38px',
  },
  button: {
    marginTop: '3rem',
    borderRadius: '3em',
    padding: '1em 3em',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: 24,
    alignSelf: ({ isDesktop }) => (isDesktop ? 'flex-start' : 'center'),
  },
  hero: {
    width: '100%',
    marginTop: '3rem',
    marginLeft: '2rem',
    position: 'relative',
    left: '8%',
  },
}))

const Section1 = () => {
  const { isDesktop, isMobile } = useBreakpoints()
  const classes = useStyles({ isDesktop })

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <h1 className={classes.heading}>
          BallotNav is Validating <br />
          Information for Future Elections.
        </h1>
        <p className={classes.message}>
          BallotNav helps voters find safe, secure,
          <br /> in-person locations to drop off your <br /> mail-in or absentee
          ballot. Launch our <br /> demo to navigate BallotNav.
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
