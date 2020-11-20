import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { saveQuery, getJurisdiction } from 'redux/actions'
import DesktopLayout from './Layouts/Desktop'
import MobileLayout from './Layouts/Mobile'
import useBreakpoints from 'hooks/useBreakpoints'

const MapPage = ({ jurisdictionId, saveQuery, getJurisdiction }) => {
  const location = useLocation()
  const { isMobile } = useBreakpoints()

  useEffect(() => {
    saveQuery(location.search)
    return () => saveQuery(null)
  }, [saveQuery, location.search])

  useEffect(() => {
    if (jurisdictionId) getJurisdiction(jurisdictionId)
  }, [getJurisdiction, jurisdictionId])

  return isMobile ? <MobileLayout /> : <DesktopLayout />
}

const mapStateToProps = (state) => ({
  jurisdictionId: state.query.jurisdictionId,
})

const mapDispatchToProps = (dispatch) => ({
  saveQuery: (urlQueryString) => dispatch(saveQuery(urlQueryString)),
  getJurisdiction: (jurisdictionId) => dispatch(getJurisdiction(jurisdictionId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MapPage)

MapPage.propTypes = {
  jurisdictionId: PropTypes.number,
  saveQuery: PropTypes.func.isRequired,
  getJurisdiction: PropTypes.func.isRequired,
}

MapPage.defaultProps = {
  jurisdictionId: null,
}
