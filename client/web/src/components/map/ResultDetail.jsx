import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Drawer } from 'rsuite';

const ResultDetail = ({
  location,
  isOpen,
}) => {
  const [open, setOpen] = useState(isOpen);

  const close = () => {
    setOpen(false);
  };

  return (
    <Drawer
      show={open}
      onHide={close}
      placement="bottom"
      size="md"
    >
      <Drawer.Header>
        <p>Result Detail</p>
      </Drawer.Header>
      <Drawer.Body>
        <p>Details</p>
      </Drawer.Body>
    </Drawer>
  );
};