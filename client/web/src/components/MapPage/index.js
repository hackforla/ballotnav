import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { getJurisdiction, clearJurisdiction } from 'store/actions/data'
import useBreakpoints from 'hooks/useBreakpoints'
import Desktop from './Desktop'
import Mobile from './Mobile'

const MapPage = ({
  selectedJurisdictionId,
  getJurisdiction,
  clearJurisdiction,
}) => {
  const { isMobile } = useBreakpoints()

  // clear jurisdiction data when leaving map page
  useEffect(() => {
    return () => clearJurisdiction()
  }, [clearJurisdiction])

  // load the jurisdiction whenever the id changes
  useEffect(() => {
    if (selectedJurisdictionId) getJurisdiction(selectedJurisdictionId)
    else clearJurisdiction()
  }, [selectedJurisdictionId, getJurisdiction, clearJurisdiction])

  return isMobile ? <Mobile /> : <Desktop />
}

const mapStateToProps = (state) => ({
  selectedJurisdictionId: select.selectedJurisdictionId(state),
})

const mapDispatchToProps = (dispatch) => ({
  getJurisdiction: (jurisdictionId) =>
    dispatch(getJurisdiction(jurisdictionId)),
  clearJurisdiction: () => dispatch(clearJurisdiction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MapPage)

MapPage.propTypes = {
  selectedJurisdictionId: PropTypes.number,
  getJurisdiction: PropTypes.func.isRequired,
}

MapPage.defaultProps = {
  selectedJurisdictionId: null,
}
