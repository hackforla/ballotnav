import React from 'react'
import { useLocation } from 'react-router-dom'
import useBreakpoints  from 'hooks/useBreakpoints'
import Layout from './Layout'
import Links from './Links'
import CurrentJurisdiction from './CurrentJurisdiction'
import { HomeButton, MenuButton, SearchButton } from './Buttons'

const Header = () => {
  const { pathname } = useLocation()
  const { isDesktop } = useBreakpoints()

  if (isDesktop)
    return (
      <Layout
        Left={HomeButton}
        Right={Links}
      />
    )

  if (pathname === '/map')
    return (
      <Layout
        Left={SearchButton}
        Center={CurrentJurisdiction}
        Right={MenuButton}
      />
    )

  return (
    <Layout
      Left={HomeButton}
      Right={MenuButton}
    />
  )
}

export default Header
