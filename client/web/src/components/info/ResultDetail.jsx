import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { Drawer, Dropdown } from 'rsuite';
import Moment from 'react-moment';
import { useMediaQuery } from 'react-responsive';

import pinIcon from '../../assets/pin-icon.svg'
import backArrow from '../../assets/back-arrow-icon.svg'
import infoIcon from '../../assets/info-icon-red.svg'
import phoneIcon from '../../assets/phone-icon.svg'

const ResultDetail = ({
  location,
  data,
  open,
  close,
}) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });
  
  if (!location) return null;

  let size;
  let placement;

  if (isDesktopOrLaptop) {
    size = "xs";
  } else {
    size = "md";
  }

  if (isDesktopOrLaptop) {
    placement = "left";
  } else {
    placement = "bottom";
  }

  const renderHours = () => {
    if (location.hours.length === 0) {
      return (
        <Dropdown.Item>
          Not available yet
        </Dropdown.Item>
      );
    }

    return location.hours.map((hour, index) => {
      const beginDate = new Date(hour.beginDate)
      const endDate = new Date(hour.endDate)
      const { openTime, closeTime } = hour

      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      if (endDate >= yesterday)
        return (
          <Dropdown.Item key={index.toString()}>
            <b>
              <Moment utc={true} date={beginDate} format={'MMM Do'} />:
            </b>
            &nbsp;
            {openTime}&nbsp;-&nbsp;{closeTime}
          </Dropdown.Item>
        )

      return null
    })
  }

  const renderLinks = () => {
    if (data.jurisdictionData.urls.length === 0) {
      return (
        <p className="gray">Not available yet</p>
      );
    }
    
    data.jurisdictionData.urls.map(url => {
      if (url.isEmail) {
        return (
          <div key={url.id} className="links">
            <p className="email">Email address: </p><a href={"mailto:" + url.url} target="_blank" rel="noopener noreferrer">{url.url}</a>
          </div>
        );
      } else {
        return (
          <div key={url.id} className="links">
            <a href={url.url} target="_blank" rel="noopener noreferrer">{url.name}</a>
          </div>
        );
      }
    });
  }

  return (
    <Drawer
      show={open}
      onHide={close}
      placement={placement}
      size={size}
      className="result-detail-drawer"
    >
      <Drawer.Header>
        <div className="back-to-list">
          <img
            id="back-arrow"
            src={backArrow}
            alt="Back arrow"
            onClick={close}
          />
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a onClick={close}>All drop offs</a>
        </div>
      </Drawer.Header>
      <Drawer.Body>
        <h1>{location.name}</h1>
        <div className="result-card-content-wrapper">
          <img className="address-icon" src={pinIcon} alt="Address icon" />
          <h4>{location.address1.substring(0, location.address1.length - 1)}</h4>&nbsp;
          <h4>{location.address2}</h4>&nbsp;
          <h4>{location.address3}</h4>&nbsp;
          <br />
          <h4 className="second-line">{location.city}, {location.state} {location.zip}</h4>
        </div>
        <div className="hours-dropdown">
          <span className="icon is-small">
            <FontAwesomeIcon icon={faClock} />
          </span>
          <Dropdown title="Hours">{renderHours()}</Dropdown>
        </div>
        <div className="info-links-header">
          <img className="info-icon" src={infoIcon} alt="Information icon" />
          <h3 className="info-links-header">Official election information</h3>
        </div>
        <div className="info-links">{renderLinks()}</div>
      </Drawer.Body>
      <Drawer.Footer className="result-detail-footer">
        <h3>
          <b>Location and hours are subject to change</b>
        </h3>
        <div className="to-verify">
          <p id="important">Call location to verify</p>
          <img className="phone-icon" src={phoneIcon} alt="Phone icon" />
          {location.contactPhone
            ? <p>{location.contactPhone}</p>
            : <p className="gray">Not available yet</p>
          }
        </div>
      </Drawer.Footer>
    </Drawer>
  )
}

export default ResultDetail
