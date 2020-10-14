import React from 'react';

const ResultCard = ({
  location,
}) => {
  return (
    <div className="result-card">
      <h3>{location.name}</h3>
      <h4>{location.address1}</h4>
      <h4>{location.address2}</h4>
      <h4>{location.address3}</h4>
      <h4>Phone: {location.contactPhone}</h4>
    </div>
  );
}

export default ResultCard;