import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import * as select from 'store/selectors'
import { saveQuery, getJurisdiction, clearJurisdiction } from 'store/actions'
import useBreakpoints from 'hooks/useBreakpoints'
import Desktop from './Desktop'
import Mobile from './Mobile'

const MapPage = ({ jurisdictionId, saveQuery, getJurisdiction, clearJurisdiction }) => {
  const location = useLocation()
  const { isMobile } = useBreakpoints()

  // clear query/data when leaving map page
  useEffect(() => {
    return () => {
      saveQuery(null)
      clearJurisdiction()
    }
  }, [saveQuery, clearJurisdiction])

  // save query params whenever url changes
  useEffect(() => {
    saveQuery()
  }, [saveQuery, location.search])

  // load the jurisdiction whenever the id changes
  useEffect(() => {
    if (jurisdictionId)
      getJurisdiction(jurisdictionId)
    else
      clearJurisdiction()
  }, [getJurisdiction, clearJurisdiction, jurisdictionId])

  return isMobile ? <Mobile /> : <Desktop />
}

const mapStateToProps = (state) => ({
  jurisdictionId: select.query(state).jurisdictionId,
})

const mapDispatchToProps = (dispatch) => ({
  saveQuery: (urlQueryString) => dispatch(saveQuery(urlQueryString)),
  getJurisdiction: (jurisdictionId) =>
    dispatch(getJurisdiction(jurisdictionId)),
  clearJurisdiction: () => dispatch(clearJurisdiction()),
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
