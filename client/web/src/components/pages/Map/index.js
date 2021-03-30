import React, { useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { getJurisdiction } from 'store/actions/data'
import useBreakpoints from 'hooks/useBreakpoints'
import Desktop from './Desktop'
import Mobile from './Mobile'

const MapPage = ({ selectedJurisdictionId, getJurisdiction }) => {
  const { isMobile } = useBreakpoints()
  const theme = useTheme()

  // clear jurisdiction when leaving map
  useEffect(() => {
    return () => getJurisdiction(null)
  }, [getJurisdiction])

  // get jurisdiction whenever selection changes
  useEffect(() => {
    getJurisdiction(selectedJurisdictionId)
  }, [selectedJurisdictionId, getJurisdiction])

  return (
    <div
      style={{
        height: `calc(100vh - ${theme.layout.headerHeight}px)`,
        overflow: 'hidden',
      }}
    >
      {isMobile ? <Mobile /> : <Desktop />}
    </div>
  )
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
