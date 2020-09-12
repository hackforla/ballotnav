import React from "react";
import { useParams } from "react-router-dom";
import ResizablePanels from "resizable-panels-react";
// temporary background image to represent map remove this and image file when real map put in
import Background from "../assets/mapPlaceholder.png";
import Logo from "../assets/ballotnav-logo.svg";
import SearchResult from "../components/SearchResult";

function Home() {
  const { id } = useParams();
  const hasID = id !== undefined;
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <div
        style={{
          height: "30px",
          padding: "5px",
        }}
      >
        <img src={Logo} alt="BallotNav Logo" style={{ height: "100%" }}></img>{" "}
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
          <div style={{ padding: "5px" }}>
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
