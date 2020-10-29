import React from 'react'

import searchIcon from 'assets/searchIcon.svg'
import buttonSearchSettings from 'assets/buttonSearchSettings.svg'
import checkIcon from 'assets/checkIcon.svg'
import pin from 'assets/pin.svg'

const SearchError = () => {
  return (
    <div className="SearchError">
      {/* <div>
        <span>Search by location</span>
        <span>State and County</span>
      </div> */}
      <div className="search">
        <input
          type="search"
          placeholder="13428 Maxella Avenue"
          className="search-input"
        ></input>
        <img src={searchIcon} className="search-icon" alt="" />
        <img src={buttonSearchSettings} className="search-settings" alt="" />
      </div>
      <h1>The address is invalid or not found</h1>
      <div className="tips">
        <h2>Search Bar tips</h2>
        <p>
          <span>
            <img src={checkIcon} alt="" />
          </span>
          Check the spelling of address you provided
        </p>
        <p>
          <img src={checkIcon} alt="" />
          Provide a new address or City/Town, State, Territory or Zip Code
        </p>
      </div>
      <div className="OR-divider">
        <p>OR</p>
        <div></div>
      </div>
      <h2>Choose your State or Territory in the dropdown</h2>
      <input type="select" />
      <div className="OR-divider">
        <p>OR</p>
        <div></div>
      </div>
      <h2>Search by:</h2>
      <p>
        <img src={pin} className="pin" alt="" />
        Current location (general location based on IP address)
      </p>
    </div>
  )
}

export default SearchError
