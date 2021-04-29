import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BallotNavThumbnail from 'assets/images/ballotNavThumbnail.svg'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: 35,
    // backgroundColor: 'green',
    // color: props => props.color,
  },
})

const VideoThumbnail = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <img style={{ height: '450px' }} src={BallotNavThumbnail} />
    </div>
  )
}

export default VideoThumbnail
