import React, { useState } from 'react'

import pinIcon from '../../assets/pin-icon.svg'
import phoneIcon from '../../assets/phone-icon.svg'
import ResultDetail from './ResultDetail'

const ResultCard = ({ data, location }) => {
  const [resultDetailOpen, setResultDetailOpen] = useState(false)

  const toggleResultDetailOpen = () => {
    setResultDetailOpen(!resultDetailOpen)
  }

  const closeResultDetail = () => {
    setResultDetailOpen(false)
  }

  return (
    <div className="result-card">
      <h3>{location.name}</h3>
      <div className="result-card-content-wrapper">
        <img className="address-icon" src={pinIcon} alt="Address icon" />
        <h4>{location.address1}</h4>&nbsp;
        <h4>{location.address2}</h4>&nbsp;
        <h4>{location.address3}</h4>&nbsp;
        <br />
        <h4 className="second-line">
          {location.city}, {location.state} {location.zip}
        </h4>
      </div>
      <div className="result-card-content-wrapper">
        <img className="phone-icon" src={phoneIcon} alt="Phone icon" />
        {location.contactPhone ? (
          <h4>{location.contactPhone}</h4>
        ) : (
          <h4 className="gray">Not available yet</h4>
        )}
      </div>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a onClick={toggleResultDetailOpen}>Location requirements and hours</a>
      <ResultDetail
        open={resultDetailOpen}
        close={closeResultDetail}
        data={data}
        location={location}
      />
    </div>
  )
}

export default ResultCard
