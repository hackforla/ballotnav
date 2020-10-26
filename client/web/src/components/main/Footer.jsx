/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */

import React from 'react'

import hackForLALogo from '../../assets/hack-for-LA-logo.svg'
import twitterLogo from '../../assets/twitter-logo.svg'
import facebookLogo from '../../assets/facebook-logo.svg'
import ivoted from '../../assets/ivoted.png'

const Footer = () => {
  return (
    <footer className="footer" id="footer">
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
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charSet="utf-8"
            ></script>
          </div>
        </div>
        <div id="privacy-policy">
          <p>
            &#169; COPYRIGHT 2020 BallotNav |{' '}
            <a href="https://docs.google.com/document/u/1/d/1hizUrt5hBhltZfo0_OhkzcbkZMkN8_-DdV-a2Uidiw0/edit">
              PRIVACY POLICY
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
