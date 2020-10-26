import React from 'react'
import infoIcon from 'assets/info-icon.svg'

const ResultHeader = ({ toggleCountyInfo, stateName, jurisdictionName }) => (
  <div className="result-header">
    <p>
      {jurisdictionName}, {stateName}
    </p>
    <img className="info-icon" src={infoIcon} alt="Information icon" />
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a onClick={toggleCountyInfo}>Important election information</a>
  </div>
)

export default ResultHeader
