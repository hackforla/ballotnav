import React from "react";
import "./SidePanelList.css";
import SearchResultJSON from "./searchResult.json";
import SidePanelSelection from "./SidePanelSelection";
import { useState } from "react";

// components
import SearchResult from "../components/SearchResult";

export default function SidePanelList(props) {
  const [showList, isSelected] = useState(true);
  function selectLocation(a) {
    console.log(a);
    isSelected(false);
  }
  if (showList == true) {
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
              distance={SearchResultJSON.distance}
              website={SearchResultJSON.website}
            />
          );
        })}
      </div>
    );
  }
  return <SidePanelSelection state={isSelected} />;
}
