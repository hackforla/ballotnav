/* eslint-disable jsx-a11y/alt-text */

import React from 'react'
import DemoBanner from 'components/main/DemoBanner'
import aboutHero from 'assets/aboutHero.svg'
import hackForLALogo from 'assets/hack-for-LA-logo.svg'
import codeForAmericaLogo from 'assets/codeForAmericaLogo.png'

const About = () => {
  return (
    <div className="About">
      <DemoBanner />
      <div className="About-wrapper">
        <h1>What is BallotNav?</h1>
        <div className="header">
          <div>
            <p>
              BallotNav is a tool that aims to help prevent disenfranchisement
              by providing reliable and up to date information on ballot drop
              off locations across the US. By partnering with organizations
              across the country, we hope to become the trusted resource for
              voters in upcoming elections. Due to distrust in the postal
              service, misguided information from the media, an inconsistent
              pool of resources provided by the government, and societal shifts
              from COVID-19, it is now more important than ever to have useful
              resources for those hoping to have their voices heard.
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
          <span className="brigade-links">
            <a href="https://www.codeforsanjose.com/">Code for San José</a>
            <a href="https://openoakland.org/">Open Oakland</a>
            <a href="https://www.codeforatlanta.org/">Code for Atlanta</a>
          </span>
        </h3>
      </div>
    </div>
  )
}

export default About
