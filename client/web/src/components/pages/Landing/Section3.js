import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useBreakpoints from 'hooks/useBreakpoints'
import AccuracyIcon from 'assets/features/check.svg'
import LocationIcon from 'assets/features/current-location.svg'
import TextIcon from 'assets/features/message-ellipsis.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '4em',
  },
  top: {
    display: 'flex',
    alignItems: ({ isDesktop }) => (isDesktop ? 'center' : 'flex-start'),
    flexDirection: ({ isDesktop }) => (isDesktop ? 'row' : 'column-reverse'),
  },
  hero: {
    width: '98%',
    marginTop: '1rem',
    position: 'relative',
    right: '5%',
  },
  left: {
    width: ({ isDesktop }) => (isDesktop ? '50%' : '100%'),
  },
  videoContainer: {
    width: '100%',
    paddingTop: '56.25%', // 16:9 aspect ratio
    height: 0,
    position: 'relative',
    marginTop: ({ isDesktop }) => (isDesktop ? 0 : '2em'),
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  right: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: ({ isDesktop }) => (isDesktop ? '4em' : 0),
  },
  bottom: {
    display: 'flex',
    flexWrap: ({ isDesktop }) => (isDesktop ? 'nowrap' : 'wrap'),
    padding: '5em 0',
  },
  bottomIcons: {
    margin: '1em 0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& img': {
      marginRight: ({ isDesktop }) => (isDesktop ? '1em' : 0),
    },
  },
  iconSize: {
    height: ({ isDesktop }) => (isDesktop ? '8.66em' : '6em'),
  },
  heading: {
    fontWeight: 700,
    fontSize: 39,
  },
  message: {
    marginTop: '1em',
    fontWeight: 400,
    fontSize: 20,
    lineHeight: '27px',
  },
  subMessage: {
    marginLeft: '1em',
    marginRight: '1em',
    fontWeight: 400,
    fontSize: 20,
    lineHeight: '32px',
    letterSpacing: '-0.41px',
  },
}))

const Section3 = () => {
  const { isDesktop } = useBreakpoints()
  const classes = useStyles({ isDesktop })

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={classes.left}>
          <div className={classes.videoContainer}>
            <iframe
              title="demo-video"
              className={classes.video}
              allowFullscreen="allowfullscreen"
              frameBorder="0"
              src="https://youtube.com/embed/Ozz-6wR5VIE"
            />
          </div>
        </div>
        <div className={classes.right}>
          <h1 className={classes.heading}>See how it works</h1>
          <p className={classes.message}>
            Simple and intuitive.
            <br /> Find out how it works in this short video.
          </p>
        </div>
      </div>
      <div className={classes.bottom}>
        <div className={classes.bottomIcons}>
          <img
            className={classes.iconSize}
            src={AccuracyIcon}
            alt={'accuracy-icon'}
          />
          <p className={classes.subMessage}>
            BallotNav <strong>validates election data</strong> to guarantee
            accurate results.
          </p>
        </div>
        <div className={classes.bottomIcons}>
          <img
            className={classes.iconSize}
            src={LocationIcon}
            alt={'location-icon'}
          />
          <p className={classes.subMessage}>
            Search for your <strong>nearest drop off locations.</strong> View
            details and directions.
          </p>
        </div>
        <div className={classes.bottomIcons}>
          <img className={classes.iconSize} src={TextIcon} alt={'text-icon'} />
          <p className={classes.subMessage}>
            Receive <strong>notifications</strong> on your phone.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Section3
