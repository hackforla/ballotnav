import React, { useState } from 'react';
import ResultHeader from './ResultHeader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Drawer } from 'rsuite';
import { ButtonToolbar } from 'rsuite';
import { Button } from 'rsuite';

import infoIcon from '../../assets/info-icon-black.svg';
import ResultCard from './ResultCard';

const ResultList = ({
  data,
  toggleCountyInfo,
}) => {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const renderResultCards = () => {
    return data.jurisdictionData.locations.map(location =>
      <ResultCard data={data} location={location} key={location.id} />
    );
  };

  return (
    <div className="result-list">
      <ButtonToolbar>
        <Button onClick={toggleDrawer}>View Drop Off List</Button>
      </ButtonToolbar>
      <Drawer
        show={open}
        onHide={close}
        placement="bottom"
        size="md"
        className="result-list-drawer"
      >
        <Drawer.Header>
          <p>{data.jurisdictionData.locations.length} drop off locations available in <b>{data.jurisdictionData.name}, {data.stateData.name}</b></p>
          <div className="county-information-wrapper">
            <img className="info-icon" src={infoIcon} alt="Information icon"/>
            <a onClick={toggleCountyInfo}>County election information</a>
          </div>
        </Drawer.Header>
        <Drawer.Body id="drawer-body">
          {renderResultCards()}
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(mapStateToProps)(ResultList);

ResultHeader.propTypes = {
  data: PropTypes.object,
}