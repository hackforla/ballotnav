import React from "react";
import "./SidePanelList.css";
import SearchResultJSON from "./searchResult.json";
import SidePanelSelection from "./SidePanelSelection";
import { useState } from "react";

// components
import SearchResult from "../components/SearchResult";

export default function SidePanelList(props) {
  const [showTest, selectLocation2] = useState(true);
  function selectLocation(a) {
    console.log(a);
    selectLocation2(false);
  }
  function goBack() {
    selectLocation2(true);
  }
  if (showTest == true) {
    return (
      <div className="sidePanelScroll">
        {SearchResultJSON.map((SearchResultJSON, index) => {
          return (
            <SearchResult
              key={SearchResultJSON.id}
              onClick={selectLocation}
              id={SearchResultJSON.id}
              title={SearchResultJSON.title}
              location={SearchResultJSON.location}
            />
          );
        })}
      </div>
    );
  }
  return <SidePanelSelection onClick={goBack} />;
}
