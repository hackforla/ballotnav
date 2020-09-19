import React from "react";
import "./About.css";
import Logo from "../assets/ballotnav-logo.png";
import Hero from "../assets/ballotnavHero.svg";
import codeForAmericaLogo from "../assets/codeForAmericaLogo.png";
import hackForLaLogo from "../assets/hackForLaLogo.png";

export default function About() {
  return (
    <div className="landingPage">
      <div className="landingFlex">
        <div className="landingContentWrapper">
          <div className="contentCenter">
            <img
              src={Logo}
              alt="BallotNav Logo"
              className="ballotnavLogoLarge"
            ></img>
            <h3>
              Find safe, secure, in-person locations to
              <br /> drop off your mail-in or absentee ballot
            </h3>
            <div className="landingFlex">
              <input
                className="landingInput"
                placeholder="Enter an address or zip code"
              ></input>
              <a href="/">
                <button className="landingSearchButton">Search</button>
              </a>
            </div>
          </div>
        </div>
        <div className="landingHeroWrapper">
          <img
            src={Hero}
            alt="BallotNav Hero"
            className="ballotnavHero"
          ></img>
        </div>
      </div>
      <div className="landingFooter">
        <a href="https://www.hackforla.org/" target="_blank" rel="noopener noreferrer">
          <img
            src={hackForLaLogo}
            alt="BallotNav Logo"
            className="landingFooterLogo"
          ></img>
        </a>
        <a href="https://www.codeforamerica.org/">
          <img
            src={codeForAmericaLogo}
            alt="BallotNav Logo"
            className="landingFooterLogo"
          ></img>
        </a>
      </div>
    </div>
  );
}
