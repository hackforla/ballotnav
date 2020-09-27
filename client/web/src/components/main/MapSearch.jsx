import React from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

class MapSearch extends React.Component {
  componentDidMount() {
    this.geocoder = new MapboxGeocoder({
      accessToken: process.env.MAPBOX_TOKEN,
      localGeocoder: searchTerm => {
      
      },
    });
  };
};

export default MapSearch;