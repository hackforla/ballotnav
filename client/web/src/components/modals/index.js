import React from 'react'
import useBreakpoints from 'hooks/useBreakpoints'
import SearchModal from './SearchModal'
import ShareModal from './ShareModal'

// temporarily commented to avoid console warnings/errors
// import VoteDotOrgModal from './VoteDotOrgModal'

const Modals = () => {
  const { isMobile } = useBreakpoints()
  return (
    <>
      {isMobile && <SearchModal />}
      <ShareModal />
      {/*<VoteDotOrgModal />*/}
    </>
  )
}

export default Modals
