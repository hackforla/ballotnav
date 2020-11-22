import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import * as select from 'store/selectors'
import { saveQuery, getJurisdiction } from 'store/actions'
import useBreakpoints from 'hooks/useBreakpoints'
import Desktop from './layouts/Desktop'
import Mobile from './layouts/Mobile'

const MapPage = ({ jurisdictionId, saveQuery, getJurisdiction }) => {
  const location = useLocation()
  const { isMobile } = useBreakpoints()

  // save query params whenever url changes
  useEffect(() => {
    saveQuery(location.search)
    return () => saveQuery(null)
  }, [saveQuery, location.search])

  // load the jurisdiction whenever the id changes
  useEffect(() => {
    if (jurisdictionId) getJurisdiction(jurisdictionId)
  }, [getJurisdiction, jurisdictionId])

  return isMobile ? <Mobile /> : <Desktop />
}

const mapStateToProps = (state) => ({
  jurisdictionId: select.query(state).jurisdictionId,
})

const mapDispatchToProps = (dispatch) => ({
  saveQuery: (urlQueryString) => dispatch(saveQuery(urlQueryString)),
  getJurisdiction: (jurisdictionId) =>
    dispatch(getJurisdiction(jurisdictionId)),
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
