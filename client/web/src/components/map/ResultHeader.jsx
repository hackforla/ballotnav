import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import infoIcon from '../../assets/info-icon.svg';
import { Drawer, InputPicker } from 'rsuite';

const handleSubmit = (e) => {
  e.preventDefault();
  return console.log(`subscribe phone number submitted`)
}

const ResultHeader = ({
  search,
  data,
}) => {
  const [open, setOpen] = useState(false);
  const [searchByLocation, setSearchByLocation] = useState(false);
  const {
    name: stateName,
    isLateRegistrationPossible: lateRegistration,
    urls,
    importantdates: importantDates
  } = data.stateData;

  const renderDate = (date) => {
    switch (date.dateType) {
      case 'deadline':
        return <span>{date.endTime}</span>;
      case 'range':
        return <span>{date.beginTime} - {date.endTime}</span>;
      default:
        return null;
    }
  }

  const close = () => {
    setOpen(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  if (search) {
    var state = search.context[search.context.length - 2].text;

    var city;
    if (search.context[search.context.length - 3]) {
      city = search.context[search.context.length - 3].text;
    } else {
      city = search.text;
    }
  }

  return (
    <div className="result-header">
      <Drawer
        className='drawer_electionInfo'
        show={open}
        onHide={close}
        placement="bottom"
        size="lg"
      >
        <Drawer.Header>
          <Drawer.Title></Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <div className='drawer_header'>
            <a onClick={() => setSearchByLocation(true)} className={searchByLocation ? 'active' : null}>Search by location</a>
            <a onClick={() => setSearchByLocation(false)} className={!searchByLocation ? 'active' : null}>State and County</a>
          </div>
          <div className='drawer_input_container'>
            <InputPicker></InputPicker>
            <InputPicker></InputPicker>
          </div>
          <div className="electionInfo">
            <p className="info_header">{stateName}</p>
            <p>
              We have found the most credible and up to date state and EAJ changes to be on <a>vote.org</a>.
            </p>
            <p className='info_header'>Important Dates</p>
            {importantDates.map(date => <p>{date.importantDateTypeName}: {renderDate(date)}</p>)}
            <p className='info_header'>Links</p>
            {urls.map(url => <a className='info_link' href={url.url}>{url.name}</a>)}
            <p>Late Registration Possible: {lateRegistration == 'N' ? 'No' : 'Yes'}</p>
            <p className='info_header'>Subscribe</p>
            <p>Last-minute changes to details about how to vote should be expected. Sign up for SMS notifications for updates to your Secretary of State website. Mobile messaging rates may apply.</p>
            <p className='info_detail'>Write your phone number to receive State's updates</p>
            <form onSubmit={handleSubmit}>
              <div>
                <input type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder='(158)-234-6678' />
                <button type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </Drawer.Body>
      </Drawer>
      {
        search &&
        <>
          <p>{city}, {state}</p>
          <img className="info-icon" src={infoIcon} alt="Information icon" />
          <a onClick={toggleDrawer}>Important election information</a>
        </>
      }
    </div >
  );
}

const mapStateToProps = state => ({
  search: state.searches[state.searches.length - 1],
  data: state.data
});

export default connect(mapStateToProps)(ResultHeader);

ResultHeader.propTypes = {
  search: PropTypes.object,
}
