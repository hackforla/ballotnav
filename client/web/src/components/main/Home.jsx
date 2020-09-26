import React from "react";

import Logo from "../../assets/ballotnav-logo.png";
import cloudImage from '../../assets/cloud-image.svg'
import codeForAmericaLogo from "../../assets/codeForAmericaLogo.png";
import hackForLaLogo from "../../assets/hackForLaLogo.png";

export default function Home() {
  return (
    <div className="hero-wrapper" role="banner">
      <div className="cloud-background" />
      <div className="hero-text-wrapper">
        <h2>Find your drop off locations</h2>
        <h3>Find safe, secure, in-person locations to drop off your mail-in or absentee ballot</h3>
      </div>
    </div>
  );
}
