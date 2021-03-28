/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */

import React from 'react'
import hackForLALogo from 'assets/logos/hack-for-la.svg'
import twitterLogo from 'assets/logos/twitter.svg'
import facebookLogo from 'assets/logos/facebook.svg'
import ivoted from 'assets/logos/ivoted.png'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import clx from 'classnames'

const Footer = () => {
  const { pathname } = useLocation()

  return (
    <footer className={clx('footer', { map: pathname === '/map' })} id="footer">
      <div className="content">
        <div className="social-wrapper">
          <a href="https://www.hackforla.org">
            <img
              id="hack-for-LA-logo"
              src={hackForLALogo}
              alt="Hack for LA logo"
            />
          </a>
          <a href="https://twitter.com/BallotNav">
            <img src={twitterLogo} alt="Twitter logo" />
          </a>
          <a href="https://www.facebook.com/BallotNav/">
            <img src={facebookLogo} alt="Facebook logo" />
          </a>
        </div>
        <div className="share-wrapper">
          <img className="button_i-voted" src={ivoted} />
          <div className="div_shareButtons">
            <p>Share with your friends</p>
            <div
              className="fb-share-button"
              data-href="https://www.ballotnav.org/"
              data-layout="button_count"
              data-size="large"
            >
              <a
                target="_blank"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.ballotnav.org%2F&amp;src=sdkpreparse"
                className="fb-xfbml-parse-ignore"
              >
                Share
              </a>
            </div>
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              className="twitter-share-button"
              data-size="large"
              data-url="https://www.ballotnav.org/"
              data-dnt="true"
              data-show-count="false"
            >
              Tweet
            </a>
          </div>
        </div>
        <div className="privacy-policy">
          <p>
            &#169; COPYRIGHT 2020 BallotNav |{' '}
            <Link to="/privacy-policy">PRIVACY POLICY</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
