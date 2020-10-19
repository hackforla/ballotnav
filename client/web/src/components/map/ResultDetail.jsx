import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'

import pinIcon from '../../assets/pin-icon.svg';
import backArrow from '../../assets/back-arrow-icon.svg';
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
        <div class="dropdown is-active">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
              <span class="icon is-small">
                <FontAwesomeIcon icon={faClock} />
              </span>
              <span>Hours</span>
              <span class="icon is-small">
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu2" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
              </div>
            </div>
          </div>
        </div>
      </Drawer.Body>
    </Drawer>
  );
};

export default ResultDetail;