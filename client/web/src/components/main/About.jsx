/* eslint-disable jsx-a11y/alt-text */

import React from 'react'

import Footer from './Footer'
import aboutHero from 'assets/aboutHero.svg'
import hackForLALogo from 'assets/hack-for-LA-logo.svg'
import codeForAmericaLogo from 'assets/codeForAmericaLogo.png'

const About = () => {
  return (
    <div className="About">
      <div className="About-wrapper">
        <h1>What is BallotNav?</h1>
        <div className="header">
          <div>
            <p>
              BallotNav is a web app that will help voters quickly find the
              location, times of operation, and due date for dropping off
              mail-in ballots in person. Due to COVID-19 and cuts to the United
              States Postal Service, some voters may feel insecure not only
              about going out to the polls, but also about utilizing the mail to
              cast their vote. While it is possible to drop off your mail-in
              ballot in person, the rules for doing so are not clearly outlined
              in one single location. Information is scattered across state and
              county websites, each of which may individually fail to provide
              one or more elements of crucial information, such as available
              ballot drop-off times. The BallotNav project will collect this
              data through a network of brigade partnerships and update it
              accordingly leading up to November’s election.
            </p>
            <p className="bold">
              BallotNav’s overall goal is to provide information that helps
              voters cast their ballots safely and correctly, and avoid
              accidental disenfranchisement.
            </p>
          </div>
          <img src={aboutHero} className="header-image" />
        </div>
        <h2>Who is making BallotNav?</h2>
        <p>
          BallotNav is an all-volunteer project initiated by Hack for LA and
          supported by brigades across the Code for America network.
        </p>
        <div className="content-wrapper">
          <div className="content-section">
            <div className="content-sectionHeader">
              <h3>
                What is{' '}
                <a href="https://www.codeforamerica.org/" className="underline">
                  Code for America?
                </a>
              </h3>
              <img src={codeForAmericaLogo} />
            </div>
            <div className="content-body">
              <p>
                Code for America is a non-partisan, non-political 501(c)(3)
                organization founded in 2009 to address the widening gap between
                the public and private sectors in their effective use of
                technology and design through tech-industry volunteerism.
              </p>
              <img src={codeForAmericaLogo} />
            </div>
          </div>
          <div className="content-section">
            <div className="content-sectionHeader">
              <h3>
                What is{' '}
                <a href="https://www.hackforla.org/#" className="underline">
                  Hack for LA?
                </a>
              </h3>
              <img src={hackForLALogo} />
            </div>
            <div className="content-body">
              <p>
                Hack for LA brings together civic-minded volunteers to build
                digital products, programs and services with community partners
                and local government to address issues in our LA region. Hack
                for LA is Code for America's official Los Angeles chapter.
              </p>
              <img src={hackForLALogo} />
            </div>
          </div>
        </div>
        <h3 className="content-footer">
          Other Participating Brigades:{' '}
          <span className="underline">Code for San José Open Oakland</span>
        </h3>
      </div>
      <Footer />
    </div>
  )
}

export default About
