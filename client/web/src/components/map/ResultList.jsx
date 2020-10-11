import React from 'react';
import ResultHeader from './ResultHeader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Drawer } from 'rsuite';

const ResultList = ({
  data,
}) => {
  return(
    <Drawer />
  );
};

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(mapStateToProps)(ResultList);

ResultHeader.propTypes = {
  data: PropTypes.object,
}