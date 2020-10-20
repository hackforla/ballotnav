import React, { useState } from 'react';
import ResultHeader from './ResultHeader';
import Map from './Map';
import CountyInfo from './CountyInfo';

const MapContainer = () => {
  const [countyInfoOpen, setCountyInfoOpen] = useState(false);

  const closeCountyInfo = () => {
    setCountyInfoOpen(false);
  };

  const toggleCountyInfo = () => {
    setCountyInfoOpen(!countyInfoOpen);
  };

  return (
    <>
      <ResultHeader toggleCountyInfo={toggleCountyInfo} />
      <Map toggleCountyInfo={toggleCountyInfo} />
      <CountyInfo open={countyInfoOpen} close={closeCountyInfo} />
    </>
  );
}

export default MapContainer;
