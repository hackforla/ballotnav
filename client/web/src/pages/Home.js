import React from "react";
import { useParams } from "react-router-dom";
import "./Home.css";

// npm module for resizing panels (should be replaced)
import ResizablePanels from "resizable-panels-react";

// temporary background image to represent map remove this and image file when real map put in
import Background from "../assets/mapPlaceholder.png";

// components
import SidePanelList from "../components/SidePanelList";
import Mapbox from "../components/Mapbox";

// png logo (svg rendered oddly)
import Logo from "../assets/ballotnav-logo.png";

function Home() {
  const { id } = useParams();
  const hasID = id !== undefined;
  return (
    <div className="application">
      <ResizablePanels
        bkcolor="#ffffff"
        displayDirection="row"
        width="100%"
        height="100%"
        panelsSize={[40, 60]}
        sizeUnitMeasure="%"
        resizerColor="#ffffff"
        resizerSize="5px"
      >
        <div className="sidePanel">
          <div className="menu">
            <a href="/about">
              <img
                src={Logo}
                alt="BallotNav Logo"
                className="ballotNavLogo"
              ></img>
            </a>
            <h1>Volunteer</h1>
            <h1>Press</h1>
            {/* search bar placeholder */}
          </div>
          <div className="menu">
            <input></input>
            <select>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
            </select>
          </div>
          {/* <SidePanelList /> */}
          <SidePanelList />
        </div>
        {/* temporary image to represent map */}
        <Mapbox />
      </ResizablePanels>
    </div>
  );
}

export default Home;
