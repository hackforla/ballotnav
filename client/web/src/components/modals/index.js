import React from 'react'
import useBreakpoints from 'hooks/useBreakpoints'
import SearchModal from './SearchModal'
import ShareModal from './ShareModal'
import VoteDotOrgModal from './VoteDotOrgModal'

const DISABLED = process.env.REACT_APP_DISABLE_VOTE_DOT_ORG === '1'

const Modals = () => {
  const { isMobile } = useBreakpoints()
  return (
    <>
      {isMobile && <SearchModal />}
      <ShareModal />
      {!DISABLED && <VoteDotOrgModal />}
    </>
  )
}

export default Modals
