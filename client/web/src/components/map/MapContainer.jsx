import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getJurisdiction } from 'redux/actions/data';
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
  getJurisdiction,
}) => {
  const [countyInfoOpen, setCountyInfoOpen] = useState(false);
  const history = useHistory();
  const [center, setCenter] = useState(null);

  useEffect(() => {
    const query = queryString.parse(history.location.search);
    //api.getJurisdiction(query.jid).then(console.log);
    getJurisdiction(query.jid);
    setCenter([query.lon, query.lat]);
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

  if (!data || !center) return null;
  return (
    <>
      <ResultHeader
        stateName={data.stateData.name}
        jurisdictionName={data.jurisdictionData.name}
        toggleCountyInfo={toggleCountyInfo}
      />
      <Map
        center={center}
        toggleCountyInfo={toggleCountyInfo}
        toggleResultDetail={toggleResultDetail}
      />
      <CountyInfo
        open={countyInfoOpen}
        close={closeCountyInfo}
      />
      <ResultDetail
        open={resultDetailOpen}
        close={closeResultDetail}
        data={data}
        location={data.jurisdictionData.locations[0]}
      />
    </>
  );
}

const mapStateToProps = state => ({
  data: state.data,
});

const mapDispatchToProps = dispatch => ({
  getJurisdiction: jurisdictionId => dispatch(getJurisdiction(jurisdictionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);

MapContainer.propTypes = {
  data: PropTypes.object,
};
