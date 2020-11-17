import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { saveQuery, getJurisdiction } from 'redux/actions'

const MapPage = ({ jurisdictionId, saveQuery, getJurisdiction }) => {
  const location = useLocation()

  useEffect(() => {
    saveQuery(location.search)
  }, [saveQuery, location.search])

  useEffect(() => {
    if (jurisdictionId) getJurisdiction(jurisdictionId)
  }, [getJurisdiction, jurisdictionId])

  return <div>Map Page</div>
}

const mapStateToProps = (state) => {
  return {
    jurisdictionId: state.query.jurisdictionId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveQuery: (urlQueryString) => dispatch(saveQuery(urlQueryString)),
    getJurisdiction: (jurisdictionId) => dispatch(getJurisdiction(jurisdictionId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage)

MapPage.propTypes = {
  jurisdictionId: PropTypes.number,
  saveQuery: PropTypes.func.isRequired,
  getJurisdiction: PropTypes.func.isRequired,
}

MapPage.defaultProps = {
  jurisdictionId: null,
}
