import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { Drawer, Dropdown } from 'rsuite';
import Moment from 'react-moment';

import pinIcon from '../../assets/pin-icon.svg';
import backArrow from '../../assets/back-arrow-icon.svg';

const ResultDetail = ({
  location,
  open,
  close,
}) => {
  const renderHours = () => location.hours.map(hour => {
    return Object.keys(hour).map((key) => {
      const dateToFormat = new Date(hour[key][0].date);
      const openingTime = new Date(hour[key][0].openTimeStamp);
      const closingTime = new Date(hour[key][0].closeTimeStamp);

      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      if (dateToFormat >= yesterday) return (
        <Dropdown.Item>
          <b><Moment date={dateToFormat} format={'MMM Do'} />:</b>&nbsp;
          <Moment date={openingTime} format={'LT'} />&nbsp;-&nbsp;
          <Moment date={closingTime} format={'LT'} />
        </Dropdown.Item>
      );
    });
  });

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
        <button></button>
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
          <Dropdown 
            title="Hours"
          >
            {renderHours()}
          </Dropdown>
        </div>
      </Drawer.Body>
    </Drawer>
  );
};

export default ResultDetail;