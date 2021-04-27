import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { ReactComponent as HeroDesktop } from 'assets/images/home-hero-desktop.svg'
import SearchBar from 'components/core/SearchBar'
import DemoBanner from 'components/core/DemoBanner'

const Desktop = withStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: theme.layout.pageWidth,
    margin: '100px auto',
    width: '100%',
  },
  hero: {
    display: 'block',
    width: '84%',
    marginLeft: '12%',
  },
  mainTextOuter: {
    position: 'relative',
  },
  mainTextInner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 15,
    paddingTop: 35,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  h1: {
    color: theme.palette.secondary.main,
    fontSize: 46,
    fontWeight: 700,
    marginBottom: 30,
  },
  h2: {
    color: theme.palette.primary.main,
    fontSize: 24,
    fontWeight: 400,
    lineHeight: '32px',
  },
  message: {
    color: theme.palette.primary.main,
    fontSize: 18,
    fontWeight: 1000,
    lineHeight: '26px',
    marginTop: 60,
  },
  search: {
    width: 450,
    marginTop: 10,
  },
}))(({ classes }) => (
  <div className={classes.root}>
    <DemoBanner />
    <div className={classes.wrapper}>
      <div className={classes.mainTextOuter}>
        <HeroDesktop className={classes.hero} />
        <div className={classes.mainTextInner}>
          <h1 className={classes.h1}>Find your drop off locations</h1>
          <h2 className={classes.h2}>
            Find safe, secure, in-person locations to <br />
            drop off your mail-in or absentee ballot
          </h2>
          <p className={classes.message}>
            BallotNav is currently working on validating information <br />
            for future elections. Please check back in with us later, <br />
            or see how you can help on our Volunteer Page.
          </p>
          <div className={classes.search}>
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  </div>
))

export default Desktop
