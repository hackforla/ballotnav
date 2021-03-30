import React from 'react'
import SearchBar from 'components/shared/SearchBar'
import { withStyles } from '@material-ui/core/styles'
import { ReactComponent as HeroMobile } from 'assets/images/home-hero-mobile.svg'
import DemoBanner from 'components/main/DemoBanner'

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
  h2: {
    color: theme.palette.secondary.main,
    fontSize: 22,
    fontWeight: 700,
    lineHeight: '30px',
    marginBottom: 10,
  },
  h3: {
    color: theme.palette.primary.main,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '18px',
  },
  h4: {
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
          <h2 className={classes.h2}>
            Find your <br /> drop off locations
          </h2>
          <h3 className={classes.h3}>
            Find safe, secure, in-person <br />
            locations to drop off <br />
            your mail-in <br />
            or absentee ballot
          </h3>
          <h4 className={classes.h4}>
            BallotNav is currently working on validating information <br />
            for future elections. Please check back in with us later, <br />
            or see how you can help on our Volunteer Page.
          </h4>
        </div>
      </div>
      <div className={classes.search}>
        <SearchBar useModal />
      </div>
    </div>
  </div>
))

export default Mobile
