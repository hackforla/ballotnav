import React, { useState } from 'react';

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
      <h4>{location.address1}</h4>
      <h4>{location.address2}</h4>
      <h4>{location.address3}</h4>
      <h4>Phone: {location.contactPhone}</h4>
      <a onClick={toggleResultDetailOpen}>Location requirements and hours</a>
      <ResultDetail open={resultDetailOpen} close={closeResultDetail} location={location} />
    </div>
  );
}

export default ResultCard;