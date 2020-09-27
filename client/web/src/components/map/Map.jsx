import React from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

class Map extends React.Component {
  componentDidMount() {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    this.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
      })
    );
  }
  
  render() {
    return (
      <div className="mapbox-container" ref={el => this.mapContainer = el}>
      </div>
    );
  }
}

export default Map;