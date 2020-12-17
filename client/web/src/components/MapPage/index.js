import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import * as select from 'store/selectors'
import { saveQuery, getJurisdiction } from 'store/actions'
import useBreakpoints from 'hooks/useBreakpoints'
import Desktop from './Desktop'
import Mobile from './Mobile'

const MapPage = ({ isLoaded, jurisdictionId, saveQuery, getJurisdiction }) => {
  const location = useLocation()
  const { isMobile } = useBreakpoints()

  // clear query/data when leaving map page
  useEffect(() => {
    return () => {
      saveQuery(null)
      getJurisdiction(null)
    }
  }, [saveQuery, getJurisdiction])

  // save query params whenever url changes
  useEffect(() => {
    saveQuery()
  }, [saveQuery, location.search])

  // load the jurisdiction whenever the id changes
  useEffect(() => {
    getJurisdiction(jurisdictionId)
  }, [getJurisdiction, jurisdictionId])

  if (!isLoaded) return null
  return isMobile ? <Mobile /> : <Desktop />
}

const mapStateToProps = (state) => ({
  isLoaded: select.isLoaded(state),
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
  isLoaded: PropTypes.bool,
}

MapPage.defaultProps = {
  jurisdictionId: null,
  isLoaded: false,
}
