import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import hackForLALogo from 'assets/logos/hack-for-la.svg'
import twitterLogo from 'assets/logos/twitter.svg'
import facebookLogo from 'assets/logos/facebook.svg'
import ivoted from 'assets/logos/ivoted.png'
import useBreakpoints from 'hooks/useBreakpoints'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    height: ({ isMobile }) => isMobile ? 'auto' : 156,
    padding: 25,
    backgroundColor: theme.palette.primary.dark,
  },
  content: {
    margin: '0 auto',
    height: '100%',
    display: ({ isMobile }) => isMobile ? 'block' : 'flex',
    alignItems: 'center',
    maxWidth: theme.layout.pageWidth,
  },
  social: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 100,
  },
  hackForLA: {
    width: 69,
    marginRight: 30,
  },
  twitter: {
    width: 32,
    marginRight: 30,
  },
  facebook: {
    width: 14,
  },
  share: {
    display: 'flex',
    alignItems: 'center',
    marginTop: ({ isMobile }) => isMobile ? 15 : 0,
    marginBottom: ({ isMobile }) => isMobile ? 15 : 0,
    marginRight: 50,
  },
  shareText: {
    color: theme.palette.common.white,
    fontWeight: 700,
    fontSize: ({ isMobile }) => isMobile ? 16 : 18,
    marginBottom: 6
  },
  shareButtons: {
    display: 'flex',
    alignItems: 'center',
    '& > :first-child': {
      marginRight: 10,
    }
  },
  ivoted: {
    width: 64,
    margin: 16,
    marginLeft: 0,
  },
  copyright: {
    flex: 1,
    textAlign: 'center',
    color: theme.palette.common.white,
    '& a': {
      color: 'inherit',
    }
  },
}))

const Footer = () => {
  const { isMobile } = useBreakpoints()
  const classes = useStyles({ isMobile })

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.social}>
          <a href="https://www.hackforla.org" target="_blank" rel="noreferrer">
            <img
              className={classes.hackForLA}
              id="hack-for-LA-logo"
              src={hackForLALogo}
              alt="Hack for LA logo"
            />
          </a>
          <a href="https://twitter.com/BallotNav" target="_blank" rel="noreferrer">
            <img
              className={classes.twitter}
              src={twitterLogo}
              alt="Twitter logo"
            />
          </a>
          <a href="https://www.facebook.com/BallotNav/" target="_blank" rel="noreferrer">
            <img
              className={classes.facebook}
              src={facebookLogo}
              alt="Facebook logo"
            />
          </a>
        </div>
        <div className={classes.share}>
          <img className={classes.ivoted} src={ivoted} alt="I voted" />
          <div>
            <div className={classes.shareText}>Share with your friends</div>
            <div className={classes.shareButtons}>
              <div
                className="fb-share-button"
                data-href="https://www.ballotnav.org/"
                data-layout="button_count"
                data-size="large"
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.ballotnav.org%2F&amp;src=sdkpreparse"
                  className="fb-xfbml-parse-ignore"
                >
                  Share
                </a>
              </div>
              <a
                href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                className="twitter-share-button"
                data-size="large"
                data-url="https://www.ballotnav.org/"
                data-dnt="true"
                data-show-count="false"
              >
                Tweet
              </a>
            </div>
          </div>
        </div>
        <div className={classes.copyright}>
          &#169; COPYRIGHT 2020 BallotNav |{' '}
          <Link to="/privacy-policy">PRIVACY POLICY</Link>
        </div>
      </div>
    </div>
  )
}


export default Footer
