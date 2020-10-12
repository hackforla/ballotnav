import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { addSearch } from '../../redux/actions/search.js';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

class HomeMapSearch extends React.Component {
  componentDidMount() {
    const {
      addSearch,
      history,
    } = this.props;

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      countries: 'us',
      types: 'address, neighborhood, locality, place, district, postcode'
    });

    geocoder.addTo('#geocoder');
    geocoder.setPlaceholder('Enter an address or ZIP');
    geocoder.on('result', ({ result }) => {
      addSearch(result);
      history.push('/map');
    });
  }

  render() {
    return (
      <div id="geocoder" />
    );
  }
};

const mapDispatchToProps = dispatch => ({
  addSearch: search => dispatch(addSearch(search)),
});

export default withRouter(connect(null, mapDispatchToProps)(HomeMapSearch));

HomeMapSearch.propTypes = {
  addSearch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};