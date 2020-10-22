import React from 'react';
import PropTypes from 'prop-types';

const BEFORE_ID = 'poi-label';

class ResultsLayer extends React.Component {
  init = ({ map }) => {
    this.map = map;

    this.addSources();
    this.addLayers();
  }

  componentDidUpdate(prev) {
    const { results } = this.props;

    if (results !== prev.results)
      this.setResults(results);
  }

  addSources = () => {
    const { results } = this.props;
    this.map.addSource('results', {
      type: 'geojson',
      data: results,
    });
  };

  addLayers = () => {
    this.map.addLayer({
      id: 'result-circles',
      type: 'circle',
      source: 'results',
      paint: {
        'circle-radius': {
          'base': 0.5,
          'stops': [
            [10, 2],
            [15, 10]
          ],
        },
        'circle-color': '#FF0029',
        'circle-opacity': 1,
      },
    }, BEFORE_ID);
  };

  setResults = results => {
    this.map.getSource('results').setData(results);
  };

  render() {
    return null;
  }
}

export default ResultsLayer;

ResultsLayer.propTypes = {
  results: PropTypes.shape({}),
};

ResultsLayer.defaultProps = {
  results: {},
};