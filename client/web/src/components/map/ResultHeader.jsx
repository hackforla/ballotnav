import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ResultHeader = ({
  search,
}) => {
  if (search) {
    var state = search.context[search.context.length - 2].text;
    var county = search.context[search.context.length - 3].text;
  }

  return (
    <div className="result-header">
      {search &&
        <>
          <p>{county}, {state}</p>
          <a>Learn more</a>
        </>
      }
    </div>
  );
}

const mapStateToProps = state => ({
  search: state.searches[state.searches.length - 1],
});

export default connect(mapStateToProps)(ResultHeader);

ResultHeader.propTypes = {
  search: PropTypes.object,
}