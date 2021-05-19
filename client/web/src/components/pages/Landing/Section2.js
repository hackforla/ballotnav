import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import WhatIsHero from 'assets/images/what-is-hero.svg'
import useBreakpoints from 'hooks/useBreakpoints'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: ({ isDesktop }) => (isDesktop ? '12em' : '6em'),
    display: 'flex',
    flexDirection: 'column',
  },
  top: {
    width: '92%',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
  },
  left: {
    width: ({ isDesktop }) => (isDesktop ? '50%' : '100%'),
    marginTop: '1rem',
    paddingRight: '1em',
    display: 'flex',
    flexDirection: 'column',
  },
  right: {
    width: '50%',
    paddingLeft: '7rem',
    position: 'relative',
    left: '7%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  heading: {
    fontWeight: 700,
    fontSize: 39,
    lineHeight: '45px',
  },
  message: {
    marginTop: ({ isDesktop }) => (isDesktop ? '3rem' : '2em'),
    fontWeight: 400,
    fontSize: 24,
    lineHeight: '35px',
    marginBottom: '1rem',
  },
  subMessage: {
    marginTop: ({ isDesktop }) => (isDesktop ? '4rem' : '2em'),
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
  },
  hero: {
    width: '100%',
    marginTop: '1rem',
  },
}))

const Section2 = () => {
  const { isDesktop, isMobile } = useBreakpoints()
  const classes = useStyles({ isDesktop })

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <h1 className={classes.heading}>What is BallotNav?</h1>
        <p className={classes.message}>
          BallotNav is a navigation tool created by Hack for LA that aims to
          prevent disenfranchisement by providing reliable and{' '}
          <strong>
            up-to-date information on ballot drop off locations across the US.
          </strong>
        </p>
      </div>
      <div className={classes.bottom}>
        <div className={classes.left}>
          <p className={classes.subMessage}>
            Due to distrust in the postal service, misguided information from
            the media, an inconsistent pool of resources provided by the
            government, and societal shifts caused by COVID-19, it is now more
            important than ever to have useful resources for those hoping to
            have their voices heard.{' '}
          </p>
          <p className={classes.subMessage}>
            Information is scattered across state and county websites, each of
            which may individually fail to provide one or more elements of
            crucial information, such as available ballot drop-off times.{' '}
            <strong>
              The BallotNav project will collect this data through a network of
              brigade partnerships and update it accordingly leading up to
              mid-term elections in 2022.
            </strong>
          </p>
          {false && isMobile && (
            <img
              className={classes.hero}
              src={WhatIsHero}
              alt="What is ballotNav icon"
            />
          )}
        </div>
        {isDesktop && (
          <div className={classes.right}>
            <img
              className={classes.hero}
              src={WhatIsHero}
              alt="What is ballotNav icon"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Section2
