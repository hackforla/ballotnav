import React from 'react';
import { connect } from 'react-redux';

const ResultHeader = ({
  search,
}) => {
  const state = search.context[search.context.length - 2].text;
  const county = search.context[search.context.length - 3].text;

  return (
    <div>
      <a>State: {state}</a>
      <a>County: {county}</a>
    </div>
  );
}

const mapStateToProps = state => ({
  search: state.search[state.search.length - 1],
});

export default connect(mapStateToProps)(ResultHeader);