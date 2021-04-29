import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BallotNavThumbnail from 'components/LandingPage/SecFour/BallotNavThumbnail'
import SectionHeader from 'components/LandingPage/SecFour/HeadSecFour'
import SubHeadSecFour from 'components/LandingPage/SecFour/SubHeadSecFour'
import Features from 'components/LandingPage/SecFour/Features'

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.layout.pageWidth,
    maxWidth: '65%',
    textAlign: 'start',
    '& h1': {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#1B2152',
    },
  },
}))

const SectionFour = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <BallotNavThumbnail />
      <SectionHeader />
      <SubHeadSecFour />
      <Features />
    </div>
  )
}

export default SectionFour
