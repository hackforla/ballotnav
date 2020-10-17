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
      className="result-detail-drawer"
    >
      <Drawer.Header>
        <div className="back-to-list">
          <a id="back-arrow">&lt; &nbsp;</a>
          <a>Back to list</a>
        </div>
      </Drawer.Header>
      <Drawer.Body>
        <h1>{location.name}</h1>
        <p>Details</p>
      </Drawer.Body>
    </Drawer>
  );
};

export default ResultDetail;