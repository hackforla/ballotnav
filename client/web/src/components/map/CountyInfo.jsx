import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Drawer } from 'rsuite';

const CountyInfo = ({
  open,
  close,
  data,
}) => {
  const {
    name: stateName,
    isLateRegistrationPossible: lateRegistration,
    urls: stateUrls,
    importantdates: stateImportantDates,
  } = data.stateData;

  const {
    name: countyName,
    importantDates: countyImportantDates,
    phones: countyPhones,
    urls: countyUrls,
  } = data.jurisdictionData;

  const renderDate = date => {
    switch (date.dateType) {
      case 'deadline':
        return <span>{date.endTime}</span>;
      case 'range':
        return <span>{date.beginTime} - {date.endTime}</span>;
      default:
        return null;
    }
  }

  return (
    <Drawer
      className='county-info'
      show={open}
      onHide={close}
      placement="bottom"
      size="lg"
    >
      <Drawer.Header>
        <h2>{countyName}, {stateName}</h2>
      </Drawer.Header>
      <Drawer.Body>
          <p>
            We have found the most credible and up to date state and EAJ changes to be on <a href="https://www.vote.org" target="_blank">vote.org</a>.
          </p>
          <h4>State Information</h4>
          <p>Important Dates</p>
          {stateImportantDates.map(date => <p>{date.importantDateTypeName}: {renderDate(date)}</p>)}
          <p>Links</p>
          {stateUrls.map(url => <a href={url.url} target="_blank">{url.name}</a>)}
          <p>Late Registration Possible: {lateRegistration == 'N' ? 'No' : 'Yes'}</p>
      </Drawer.Body>
    </Drawer>
  );
}

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(mapStateToProps)(CountyInfo);

CountyInfo.propTypes = {
  data: PropTypes.object,
}