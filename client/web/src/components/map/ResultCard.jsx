import React, { useState } from 'react';

import pinIcon from '../../assets/pin-icon.svg';
import ResultDetail from './ResultDetail';

const ResultCard = ({
  location,
}) => {
  const [resultDetailOpen, setResultDetailOpen] = useState(false);

  const toggleResultDetailOpen = () => {
    setResultDetailOpen(!resultDetailOpen);
  };

  const closeResultDetail = () => {
    setResultDetailOpen(false);
  }

  return (
    <div className="result-card">
      <h3>{location.name}</h3>
      <img className="address-icon" src={pinIcon} alt="Address icon" />
      <div className="result-card-content-wrapper">
        <h4>{location.address1.substring(0, location.address1.length - 1)}, {location.address2}{location.address3}</h4>
      </div>
      <div className="result-card-content-wrapper">
        <h4>Phone: {location.contactPhone}</h4>
      </div>
      <a onClick={toggleResultDetailOpen}>Location requirements and hours</a>
      <ResultDetail open={resultDetailOpen} close={closeResultDetail} location={location} />
    </div>
  );
}

export default ResultCard;