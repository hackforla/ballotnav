import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Header from './Header'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'
import Section4 from './Section4'
import Section5 from './Section5'

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.layout.pageWidth,
    maxWidth: '100%',
    margin: '0 auto',
    outline: '3px red solid',
    padding: '0 1em',
    color: theme.palette.primary.main,
  },
}))

const Landing = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </div>
  )
}

export default Landing
