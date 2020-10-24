import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import ResultHeader from '../info/ResultHeader';
import Map from './Map';
import CountyInfo from '../info/CountyInfo';
import ResultDetail from '../info/ResultDetail';
import queryString from 'query-string';
import api from 'services/api';

const MapContainer = ({
  data,
}) => {
  const [countyInfoOpen, setCountyInfoOpen] = useState(false);
  // const [data, setData] = useState(null);
  const history = useHistory();
  console.log('data:', data);

  useEffect(() => {
    const query = queryString.parse(history.location.search);
    api.getJurisdiction(query.jid).then(console.log);
  }, [history.location.search])

  const closeCountyInfo = () => {
    setCountyInfoOpen(false);
  };

  const toggleCountyInfo = () => {
    setCountyInfoOpen(!countyInfoOpen);
  };

  const [resultDetailOpen, setResultDetailOpen] = useState(false);

  const closeResultDetail = () => {
    setResultDetailOpen(false);
  };

  const toggleResultDetail = () => {
    setResultDetailOpen(!resultDetailOpen);
  };

  return (
    <>
      <ResultHeader toggleCountyInfo={toggleCountyInfo} />
      <Map toggleCountyInfo={toggleCountyInfo} toggleResultDetail={toggleResultDetail} />
      <CountyInfo open={countyInfoOpen} close={closeCountyInfo} />
      {data && (
        <ResultDetail open={resultDetailOpen} close={closeResultDetail} data={data} location={data.jurisdictionData.locations[0]} />
      )}

    </>
  );
}

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(mapStateToProps)(MapContainer);

MapContainer.propTypes = {
  data: PropTypes.object,
};
