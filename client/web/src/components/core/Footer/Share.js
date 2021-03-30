import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ivoted from 'assets/logos/ivoted.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  shareText: {
    fontWeight: 700,
    marginBottom: '0.5em',
    fontSize: '1.2em',
  },
  shareButtons: {
    display: 'flex',
    alignItems: 'center',
    '& > :first-child': {
      marginRight: '0.75em',
    }
  },
  ivoted: {
    width: '4em',
    marginRight: '1em',
  },
}))

const Share = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
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
  )
}

export default Share
