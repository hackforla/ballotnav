// for documentation see
// Add points to a map: https://docs.mapbox.com/help/tutorials/add-points-pt-1/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSearch } from '../../redux/actions/search.js';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import ResultList from '../info/ResultList';
import ResultsLayer from './ResultsLayer';

const closeAlert = () => {
  const alert = document.getElementById('alert');
  alert.style.display = 'none'
}

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.resultsLayer = null;
  }

  componentDidMount() {
    const {
      search,
      addSearch,
    } = this.props;

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    const center = (search ? search.center : [-87.6244, 41.8756]);

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: 13,
    });

    this.map.on('load', () => {
      this.initLayers(true);
      this.map.on('click', this.onClick);
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      countries: 'us',
      types: 'address, neighborhood, locality, place, district, postcode'
    });

    document.getElementById('map-geocoder').appendChild(geocoder.onAdd(this.map));

    geocoder.on('result', ({ result }) => {
      addSearch(result);
    });
  }

  initLayers = () => {
    this.resultsLayer.init({
      map: this.map,
    });
  }

  onClick = e => {
    const {
      toggleResultDetail,
    } = this.props;

    const features = this.map.queryRenderedFeatures(e.point, {
      layers: ['result-circles'],
    })

    for (let i = 0; i < features.length; i++) {
      const feature = features[i];

      if (feature.layer.id === 'result-circles') {
        toggleResultDetail();
      }
    }
  }

  render() {
    const {
      chicagoParks,
    } = this.props;

    return (
      <div className="map">
        <div id='alert'>
          <span>Remember to verify information through the official website and phone number before you leave</span>
          <button onClick={() => closeAlert()}>
            <span class="icon is-small">
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </button>
        </div>
        <ResultList toggleCountyInfo={this.props.toggleCountyInfo} />
        <div id="map-container" ref={el => this.mapContainer = el}>
          <ResultsLayer
            results={chicagoParks}
            ref={el => this.resultsLayer = el}
          />
        </div>
        <div id="map-geocoder" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.searches[state.searches.length - 1],
  chicagoParks: state.chicagoParks,
});

const mapDispatchToProps = dispatch => ({
  addSearch: search => dispatch(addSearch(search)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Map);

Map.propTypes = {
  search: PropTypes.object,
  addSearch: PropTypes.func.isRequired,
  chicagoParks: PropTypes.object,
};