import React from 'react'
import useBreakpoints from 'hooks/useBreakpoints'
import SearchModal from './SearchModal'
import ShareModal from './ShareModal'
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
