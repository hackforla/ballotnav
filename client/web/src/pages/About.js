import React from "react";
import "./About.css";
import Logo from "../assets/ballotnav-logo.png";

export default function About() {
  return (
    <div className="landingPage">
      <img src={Logo} alt="BallotNav Logo" className="ballotNavLogoLarge"></img>
      <input
        className="landingInput"
        placeholder="search ballot drop-off locations"
      ></input>
    </div>
  );
}
