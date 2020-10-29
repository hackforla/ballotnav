import React from 'react'
import Footer from './Footer'
import SearchBar from 'components/SearchBar'

const Home = () => {
  return (
    <div className="Home">
      <div className="hero-wrapper" role="banner">
        <div className="cloud-background" />
        <div className="hero-text-wrapper">
          <h2>
            Find your <br /> drop off locations
          </h2>
          <h3>
            Find safe, secure, in-person locations to drop off your mail-in or
            absentee ballot
          </h3>
        </div>
        <SearchBar />
        <img className="hero-image" alt="Hero" />
      </div>
      <Footer />
    </div>
  )
}

export default Home
