import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import infoIcon from '../../assets/info-icon.svg';

const ResultHeader = ({
  search,
  toggleCountyInfo,
}) => {
  if (search) {
    var state = search.context[search.context.length - 2].text;

    var city;
    if (search.context[search.context.length - 3]) {
      city = search.context[search.context.length - 3].text;
    } else {
      city = search.text;
    }
  }

  return (
    <div className="result-header">
      {
        search &&
        <>
          <p>{city}, {state}</p>
          <img className="info-icon" src={infoIcon} alt="Information icon" />
          <a onClick={toggleCountyInfo}>Important election information</a>
        </>
      }
    </div >
  );
}

const mapStateToProps = state => ({
  search: state.searches[state.searches.length - 1],
});

export default connect(mapStateToProps)(ResultHeader);

ResultHeader.propTypes = {
  search: PropTypes.object,
}
