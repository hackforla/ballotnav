import React, { useState } from "react";
//import { useParams } from "react-router-dom";
import "./Home.css";

// npm module for resizing panels (should be replaced)
import ResizablePanels from "resizable-panels-react";

// components
import SidePanelList from "../components/SidePanelList";
import SidePanelSelection from "../components/SidePanelSelection";
import Mapbox from "../components/Mapbox";

// png logo (svg rendered oddly)
import Logo from "../assets/ballotnav-logo.png";

function Home() {
  //const { id } = useParams();
  //const hasID = id !== undefined;
  const [showDetails, setShowDetails] = useState(false);
  const [searchResultId, setSearchResultId] = useState(0);
  function goToDetails(id) {
    setShowDetails(true);
    setSearchResultId(id);
  }

  function goToHome() {
    setShowDetails(false);
  }
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
            <a
              href="https://www.hackforla.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="noDecoration"
            >
              <h2>volunteer</h2>
            </a>
            <a
              href="https://www.ballotnav.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="noDecoration"
            >
              <h2>press</h2>
            </a>
          </div>
          <div className="menu">
            <input></input>
            {/* <select>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
            </select> */}
            <button className="searchButton">Search</button>
          </div>
          {!showDetails ? (
            <SidePanelList
              goToDetails={goToDetails}
              showDetails={showDetails}
            />
          ) : (
            <SidePanelSelection
              searchResultId={searchResultId}
              goToHome={goToHome}
            />
          )}
        </div>
        {/* temporary image to represent map */}
        <Mapbox />
      </ResizablePanels>
    </div>
  );
}

export default Home;
