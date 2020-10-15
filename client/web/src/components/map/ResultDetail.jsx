import React from 'react';

import { Drawer } from 'rsuite';

const ResultDetail = ({
  location,
  open,
  close,
}) => {
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

export default ResultDetail;