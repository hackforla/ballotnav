import React from 'react'

import Footer from './Footer'
import volunteerHero from 'assets/volunteerHero.svg'

const Volunteer = () => {
  return (
    <div className="Volunteer">
      <div className="Volunteer-wrapper">
        <h1>Get involved</h1>
        <p>BallotNav is looking for the following types of volunteers:</p>
        <div className="header-wrapper">
          <div className="header-content">
            <h2>Community Data Monitor</h2>
            <p>
              Community Data Monitors We need an army of people to collect
              information about drop-off sites for 3,000 counties, and remain
              on-call to update it when changes occur. If you are already a
              volunteer, go to your dashboard.
            </p>
          </div>
          <img src={volunteerHero} alt="" />
        </div>
        <div className="cards-wrapper">
          <div className="volunteer-card">
            <h3>Marketing, PR & Partnerships</h3>
            <p>Lorem ipsum</p>
          </div>
          <div className="volunteer-card">
            <h3>Fundraising</h3>
            <p>Lorem ipsum</p>
          </div>
          <div className="volunteer-card">
            <h3>Software Developers & Data Scientists</h3>
            <p>Slurm Ipzm</p>
          </div>
          <div className="volunteer-card">
            <h3>Translators</h3>
            <p>Spanish especially</p>
          </div>
        </div>
        <div className="apply-wrapper">
          <p>
            If you are already a{' '}
            <span className="color-red bold">
              Code for America Brigade member
            </span>
            , please visit #voting-rights in the Code for America Slack org to
            onboard.
          </p>
          <div>
            <button>Apply</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Volunteer
