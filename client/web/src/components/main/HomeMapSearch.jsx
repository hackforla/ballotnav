import React from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

class HomeMapSearch extends React.Component {
  componentDidMount() {
    const { map } = this.props;
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
    });

    this.geocoder.addTo('#geocoder');
    document.getElementById('geocoder').appendChild(this.geocoder.onAdd(map));
    this.geocoder.setPlaceholder('Enter an address or ZIP');
  }

  render () {
    return (
      <div id="geocoder" />
    );
  }
};

export default HomeMapSearch;