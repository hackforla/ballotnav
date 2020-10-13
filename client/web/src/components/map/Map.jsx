// for documentation see
// Add points to a map: https://docs.mapbox.com/help/tutorials/add-points-pt-1/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSearch } from '../../redux/actions/search.js';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

import ResultList from './ResultList';

const closeAlert = () => {
  const alert = document.getElementById('alert');
  alert.style.display = 'none'
}

class Map extends React.Component {
  componentDidMount() {
    const {
      search,
      addSearch,
    } = this.props;

    // mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    mapboxgl.accessToken = 'pk.eyJ1IjoidGFuLW5hdGUiLCJhIjoiY2tjcGF1Zjh4MDI2aDJxbzV6b3JnNDdteSJ9.mVcEpxfcbzlXg7_LPaqRBA';

    const center = (search ? search.center : [-77.036556, 38.8977365]);

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/tan-nate/ckfmcl2s35enw19qixfux8dop',
      center: center,
      zoom: 13,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      countries: 'us',
      types: 'address, neighborhood, locality, place, district, postcode'
    });

    document.getElementById('map-geocoder').appendChild(geocoder.onAdd(map));

    geocoder.on('result', ({ result }) => {
      addSearch(result);
    });

    map.on('click', e => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['chicago-parks'] // replace this with the name of the layer
      });

      if (!features.length) {
        return;
      }

      const feature = features[0];

      new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
        .addTo(map);
    });
  }

  render() {
    return (
      <div className="map">
        <div id='alert'>
          <span>Remember to verify the information through the official website and phone number before you leave</span>
          <button onClick={() => closeAlert()}>X</button>
        </div>
        <ResultList />
        <div id="map-container" ref={el => this.mapContainer = el}>
          <div id="map-geocoder" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.searches[state.searches.length - 1],
});

const mapDispatchToProps = dispatch => ({
  addSearch: search => dispatch(addSearch(search)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Map);

Map.propTypes = {
  search: PropTypes.object,
  addSearch: PropTypes.func.isRequired,
};