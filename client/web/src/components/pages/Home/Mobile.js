import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { ReactComponent as HeroMobile } from 'assets/images/home-hero-mobile.svg'
import SearchBar from 'components/core/SearchBar'
import DemoBanner from 'components/core/DemoBanner'

const Mobile = withStyles((theme) => ({
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
    width: '100%',
    margin: '10% auto',
  },
  hero: {
    display: 'block',
    width: '100%',
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
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  h1: {
    color: theme.palette.secondary.main,
    fontSize: 22,
    fontWeight: 700,
    lineHeight: '30px',
    marginBottom: 10,
  },
  h2: {
    color: theme.palette.primary.main,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '18px',
  },
  message: {
    color: theme.palette.primary.main,
    fontSize: 12,
    fontWeight: 1000,
    lineHeight: '18px',
    marginTop: 20,
  },
  search: {
    padding: 15,
  },
}))(({ classes }) => (
  <div className={classes.root}>
    <DemoBanner />
    <div className={classes.wrapper}>
      <div className={classes.mainTextOuter}>
        <HeroMobile className={classes.hero} />
        <div className={classes.mainTextInner}>
          <h1 className={classes.h1}>
            Find your <br /> drop off locations
          </h1>
          <h2 className={classes.h2}>
            Find safe, secure, in-person <br />
            locations to drop off <br />
            your mail-in <br />
            or absentee ballot
          </h2>
          <p className={classes.message}>
            BallotNav is currently displaying ballot drop-off <br/>
            locations for the New Jersey election on June 8, 2021.
            {/*BallotNav is currently working on validating information <br />
            for future elections. Please check back in with us later, <br />
            or see how you can help on our Volunteer Page.*/}
          </p>
        </div>
      </div>
      <div className={classes.search}>
        <SearchBar useModal />
      </div>
    </div>
  </div>
))

export default Mobile
