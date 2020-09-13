import React from "react";
import { useParams } from "react-router-dom";
import ResizablePanels from "resizable-panels-react";
// temporary background image to represent map remove this and image file when real map put in
import Background from "../assets/mapPlaceholder.png";
import Logo from "../assets/ballotnav-logo.svg";
import SearchResult from "../components/SearchResult";
import "../pages/Home.css";

function Home() {
  const { id } = useParams();
  const hasID = id !== undefined;
  return (
    <div className="application">
      <div className="menu">
        <img src={Logo} alt="BallotNav Logo" className="ballotNavLogo"></img>
        <div className="search">
          <div>
            <span className="searchText">Search</span> <input></input>
          </div>
          <hr></hr>
        </div>
        {hasID ? "id: " + id : ""}
      </div>
      <ResizablePanels
        bkcolor="#ffffff"
        displayDirection="row"
        width="100%"
        height="100%"
        panelsSize={[40, 60]}
        sizeUnitMeasure="%"
        resizerColor="#333333"
        resizerSize="5px"
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundImage: "url(" + Background + ")",
            backgroundSize: "cover",
          }}
        ></div>
        <div
          style={{
            background: "#dddddd",
            height: "100%",
            width: "100%",
          }}
        >
          <div className="sidePanel">
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
          </div>
        </div>
      </ResizablePanels>
      <br />
    </div>
  );
}

export default Home;
