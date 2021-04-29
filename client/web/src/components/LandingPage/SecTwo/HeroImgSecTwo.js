import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MapHero from 'assets/images/sectionTwoA.svg'
import VoterHero from 'assets/images/sectionTwoB.svg'

const useStyles = makeStyles({
  root: {
    // maxWidth: '250px',
    display: 'flex',
    justifyContent: 'flex-end',
    // backgroundColor: 'blue',
    // color: props => props.color,
  },
})

const HeroImgSecTwo = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <img style={{ height: '325px' }} src={MapHero} />
      <img style={{ height: '455px' }} src={VoterHero} />
    </div>
  )
}

export default HeroImgSecTwo
