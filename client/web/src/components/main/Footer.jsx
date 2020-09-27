import React from 'react';

import hackForLALogo from '../../assets/hack-for-LA-logo.svg';
import twitterLogo from '../../assets/twitter-logo.svg';
import facebookLogo from '../../assets/facebook-logo.svg';


const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="content has-text-centered">
        <div className="social-wrapper">
          <a href="https://www.hackforla.org">
            <img id="hack-for-LA-logo" src={hackForLALogo} />
          </a>
          <a>
            <img src={twitterLogo} />
          </a>
          <a>
            <img src={facebookLogo} />
          </a>
        </div>
        <div id="privacy-policy">
          <p>
            &#169; 2020 BallotNav | Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;