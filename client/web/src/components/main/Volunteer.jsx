import React from 'react'

import volunteerHero from 'assets/volunteerHero.svg'

const Volunteer = () => {
  return (
    <div className="Volunteer">
      <div className="Volunteer-wrapper">
        <h1>Get Involved</h1>
        <p>BallotNav is looking for the following types of volunteers:</p>
        <div className="header-wrapper">
          <div className="header-content">
            <h2 className="red">Urgent: </h2>
            <h2>Community Data Monitors</h2>
            <p>
              We need an army of volunteers who can validate information about 
              drop-off sites by calling local election officials. 
            </p>
            <h2>Marketing & PR</h2>
            <p>
              We need marketing and PR gurus who can help us spread the word 
              about BallotNav and cultivate partnerships that will allow us to 
              expand.
            </p>
          </div>
          <img src={volunteerHero} alt="" />
        </div>
        <div className="cards-wrapper">
          <div className="volunteer-card">
            <h3>Fundraising</h3>
            <p>
              As we grow, we will need funds to enhance our app infrastructure 
              and marketing efforts.
            </p>
          </div>
          <div className="volunteer-card">
            <h3>Software Developers & Data Scientists</h3>
            <p>
              We always need devs who can reinvision who we are and propel us into the future.
            </p>
          </div>
          <div className="volunteer-card">
            <h3>Translators</h3>
            <p>
              Our app's greatest flaw is its limitation to English, and we desperately need 
              translators who can help us better serve America's diverse communities. 
            </p>
          </div>
        </div>
        <div className="apply-wrapper">
          <div>
            <a className="button" target="_blank" href="mailto: ballotnav@hackforla.org">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Volunteer
