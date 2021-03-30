import React from 'react'
import Desktop from './Desktop'
import Mobile from './Mobile'
import useBreakpoints from 'hooks/useBreakpoints'

const Home = () => {
  const { isMobile } = useBreakpoints()
  return isMobile ? <Mobile /> : <Desktop />
}

export default Home
