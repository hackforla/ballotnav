import React, { useState } from 'react';
import ResultHeader from './ResultHeader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { Drawer } from 'rsuite'
import { ButtonToolbar } from 'rsuite'
import { Button } from 'rsuite'

import infoIcon from '../../assets/info-icon-black.svg'
import ResultCard from './ResultCard'

const ResultList = ({
  data,
  toggleCountyInfo,
}) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)'
  });

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' });

  const [open, setOpen] = useState(true);

  const close = () => {
    setOpen(false)
  }

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const renderResultCards = () => {
    return data.jurisdictionData.locations.map((location) => (
      <ResultCard data={data} location={location} key={location.id} />
    ))
  }

  return (
    <div className="result-list">
      {isDesktopOrLaptop && <>
        <div className="result-list-desktop">
          {data.jurisdictionData.locations.length === 1
            ? <p>{data.jurisdictionData.locations.length} drop off location available in <b>{data.jurisdictionData.name}, {data.stateData.name}</b></p>
            : <p>{data.jurisdictionData.locations.length} drop off locations available in <b>{data.jurisdictionData.name}, {data.stateData.name}</b></p>
          }
          <div className="county-information-wrapper">
            <img className="info-icon" src={infoIcon} alt="Information icon" />
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={toggleCountyInfo}>County election information</a>
          </div>
          {renderResultCards()}
        </div>
      </>}
      
      {isTabletOrMobile && <>
        <ButtonToolbar>
          <Button onClick={toggleDrawer}>View Drop Off List</Button>
        </ButtonToolbar>
        <Drawer
          show={open}
          onHide={close}
          placement="bottom"
          size="md"
          className="result-list-drawer"
        >
          <Drawer.Header>
            {data.jurisdictionData.locations.length === 1
              ? <p>{data.jurisdictionData.locations.length} drop off location available in <b>{data.jurisdictionData.name}, {data.stateData.name}</b></p>
              : <p>{data.jurisdictionData.locations.length} drop off locations available in <b>{data.jurisdictionData.name}, {data.stateData.name}</b></p>
            }
            <div className="county-information-wrapper">
              <img className="info-icon" src={infoIcon} alt="Information icon"/>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a onClick={toggleCountyInfo}>County election information</a>
            </div>
          </Drawer.Header>
          <Drawer.Body id="drawer-body">
            {renderResultCards()}
          </Drawer.Body>
        </Drawer>
      </>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  data: state.data,
})

export default connect(mapStateToProps)(ResultList)

ResultHeader.propTypes = {
  data: PropTypes.object,
}
