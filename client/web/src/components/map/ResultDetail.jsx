import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faClock } from '@fortawesome/free-solid-svg-icons'

import pinIcon from '../../assets/pin-icon.svg';
import backArrow from '../../assets/back-arrow-icon.svg';
import { Drawer, Dropdown } from 'rsuite';

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
          <img id="back-arrow" src={backArrow} alt="Back arrow" />
          <a>All drop offs</a>
        </div>
      </Drawer.Header>
      <Drawer.Body>
        <h1>{location.name}</h1>
        <div className="result-card-content-wrapper">
          <img className="address-icon" src={pinIcon} alt="Address icon" />
          <h4>{location.address1.substring(0, location.address1.length - 1)}, {location.address2}</h4>
          <br />
          <h4 className="second-line">{location.address3}</h4>
        </div>
        <div className="hours-dropdown">
          <span class="icon is-small">
            <FontAwesomeIcon icon={faClock} />
          </span>
          <Dropdown title="Hours">
            <Dropdown.Item>New File</Dropdown.Item>
            <Dropdown.Item>New File with Current Profile</Dropdown.Item>
            <Dropdown.Item>Download As...</Dropdown.Item>
            <Dropdown.Item>Export PDF</Dropdown.Item>
            <Dropdown.Item>Export HTML</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>About</Dropdown.Item>
          </Dropdown>
        </div>
      </Drawer.Body>
    </Drawer>
  );
};

export default ResultDetail;