import React from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

import searchIcon from '../../assets/search-icon.svg';

class MapSearch extends React.Component {
  componentDidMount() {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
    });

    this.geocoder.addTo('#geocoder');
    this.geocoder.setPlaceholder('Enter an address or ZIP');
  }

  render () {
    return (
      <div id="geocoder" />
    );
  }
};

export default MapSearch;