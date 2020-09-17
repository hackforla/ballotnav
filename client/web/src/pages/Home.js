import React from "react";
import { useParams } from "react-router-dom";
import "./Home.css";

// npm module for resizing panels (should be replaced)
import ResizablePanels from "resizable-panels-react";

// temporary background image to represent map remove this and image file when real map put in
import Background from "../assets/mapPlaceholder.png";

// components
import SidePanelList from "../components/SidePanelList";
import SidePannelSelection from "../components/SidePanelSelection";

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
            <img
              src={Logo}
              alt="BallotNav Logo"
              className="ballotNavLogo"
            ></img>
            {/* search bar placeholder */}
            <input></input>
          </div>
          {/* <SidePanelList /> */}
          <SidePanelList />
        </div>
        {/* temporary image to represent map */}
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundImage: "url(" + Background + ")",
            backgroundSize: "cover",
          }}
        ></div>
      </ResizablePanels>
    </div>
  );
}

export default Home;
