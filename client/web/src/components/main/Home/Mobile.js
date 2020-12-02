import React from 'react'
import Footer from '../Footer'
import SearchBar from 'components/shared/SearchBar'
import { withStyles } from '@material-ui/core/styles'
import { ReactComponent as HeroMobile } from 'assets/images/home-hero-mobile.svg'

const Mobile = withStyles(theme => ({
  root: {
    minHeight: `calc(100vh - ${theme.layout.headerHeight}px)`,
    display: 'flex',
    flexDirection: 'column',
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 20,
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
    paddingBottom: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
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
  search: {
    padding: 15,
  },
}))(({ classes }) => (
  <div className={classes.root}>
    <div className={classes.wrapper}>
      <div className={classes.mainTextOuter}>
        <HeroMobile className={classes.hero} />
        <div className={classes.mainTextInner}>
          <h2 className={classes.h2}>
            Find your <br /> drop off locations
          </h2>
          <h3 className={classes.h3}>
            Find safe, secure, in-person <br/>
            locations to drop off <br/>
            your mail-in <br/>
            or absentee ballot
          </h3>
        </div>
      </div>
      <div className={classes.search}>
        <SearchBar useModal />
      </div>
    </div>
    <Footer />
  </div>
))

export default Mobile
