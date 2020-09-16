import React from "react";
import "./SidePanelList.css";
import SearchResultJSON from "./searchResult.json";

// components
import SearchResult from "../components/SearchResult";

export default function SidePanelList() {
  function selectLocation(a) {
    console.log(a);
  }
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
