import React from 'react';

import searchIcon from '../../assets/search-icon.svg';

class MapSearch extends React.Component {
  render () {
    return (
      <div class="field" id="map-search-wrapper">
        <div class="control" id="search-input">
          <input id="map-search" class="input" type="text" placeholder="Enter an address or ZIP" />
        </div>
        <div class="control">
          <button class="button is-link">
            <img src={searchIcon} />
          </button>
        </div>
      </div>
    );
  }
};

export default MapSearch;