import React, { useState } from 'react';
import ResultHeader from './ResultHeader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Drawer } from 'rsuite';
import { ButtonToolbar } from 'rsuite';
import { Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import Result from './Result';

const ResultList = ({
  data,
}) => {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  }

  const toggleDrawer = () => {
    setOpen(!open);
  }

  return (
    <div>
        <ButtonToolbar>
          <Button onClick={toggleDrawer}>Open</Button>
        </ButtonToolbar>
        <Drawer
          show={open}
          onHide={close}
        >
          <Drawer.Header>
            <Drawer.Title>Drawer Title</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Result />
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