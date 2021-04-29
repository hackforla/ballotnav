import React from 'react'
import LaptopHero from 'assets/images/about-hero.svg'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    // maxWidth: '250px',
    display: 'flex',
    justifyContent: 'flex-end',
    // backgroundColor: 'blue',
    // color: props => props.color,
  },
})

const HeroImgSecOne = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <img style={{ height: '455px' }} src={LaptopHero} />
    </div>
  )
}

export default HeroImgSecOne
