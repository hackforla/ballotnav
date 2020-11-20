import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { selectLocation } from 'store/actions'
import LocationCard from './LocationCard'
import Divider from '@material-ui/core/Divider'

const LocationsList = ({ locations, selectLocation }) => {
  return locations.map((location, index) => (
    <Fragment key={location.id}>
      <LocationCard
        location={location}
        selectLocation={selectLocation.bind(null, location.id)}
      />
      {index !== locations.length - 1 && (
        <Divider style={{ margin: '8px 0' }} />
      )}
    </Fragment>
  ))
}

const mapStateToProps = (state) => ({
  locations: select.sortedLocations(state),
})

const mapDispatchToProps = (dispatch) => ({
  selectLocation: (locationId) => dispatch(selectLocation(locationId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationsList)

LocationsList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  selectLocation: PropTypes.func.isRequired,
}

LocationsList.defaultProps = {
  locations: [],
}
