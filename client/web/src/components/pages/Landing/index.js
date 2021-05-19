import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useBreakpoints from 'hooks/useBreakpoints'
import Header from './Header'
import Rectangle from 'assets/images/rectangle-shape.svg'
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
    color: theme.palette.primary.main,
    position: 'relative',
    padding: ({ isDesktop }) => (isDesktop ? '0 10em' : '0 1.5em'),
  },
  background: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    width: '100%',
    display: ({ isDesktop }) => (isDesktop ? 'block' : 'none'),
  },
}))

const Landing = () => {
  const { isDesktop } = useBreakpoints()
  const classes = useStyles({ isDesktop })

  return (
    <div className={classes.root}>
      <img
        className={classes.background}
        src={Rectangle}
        alt="background-section"
      />
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
