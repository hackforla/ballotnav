import React, { useState } from 'react';
import ResultHeader from './ResultHeader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Drawer } from 'rsuite';
import { ButtonToolbar } from 'rsuite';
import { Button } from 'rsuite';

import ResultCard from './ResultCard';

const ResultList = ({
  data,
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
      <ResultCard location={location} />
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
        size="lg"
      >
        <Drawer.Header>
          <Drawer.Title>Dropoffs Near You</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          {renderResultCards()}
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick={close} appearance="primary">Confirm</Button>
          <Button onClick={close} appearance="subtle">Cancel</Button>
        </Drawer.Footer>
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