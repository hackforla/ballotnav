import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { getJurisdiction } from 'store/actions/data'
import useBreakpoints from 'hooks/useBreakpoints'
import Desktop from './Desktop'
import Mobile from './Mobile'

const MapPage = ({ selectedJurisdictionId, getJurisdiction }) => {
  const { isMobile } = useBreakpoints()

  // clear jurisdiction when leaving map
  useEffect(() => {
    return () => getJurisdiction(null)
  }, [getJurisdiction])

  // get jurisdiction whenever selection changes
  useEffect(() => {
    getJurisdiction(selectedJurisdictionId)
  }, [selectedJurisdictionId, getJurisdiction])

  return isMobile ? <Mobile /> : <Desktop />
}

const mapStateToProps = (state) => ({
  selectedJurisdictionId: select.selectedJurisdictionId(state),
})

const mapDispatchToProps = (dispatch) => ({
  getJurisdiction: (jid) => dispatch(getJurisdiction(jid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MapPage)

MapPage.propTypes = {
  selectedJurisdictionId: PropTypes.number,
  getJurisdiction: PropTypes.func.isRequired,
}

MapPage.defaultProps = {
  selectedJurisdictionId: null,
}
