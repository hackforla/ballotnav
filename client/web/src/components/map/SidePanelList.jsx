import React from "react";
import SearchResultJSON from '../../searchResult';
import SidePanelSelection from "./SidePanelSelection";

// components
import SearchResult from "./SearchResult";

export default function SidePanelList({ goToDetails }) {
  function selectLocation(a) {
    console.log(a);
    goToDetails(a);
  }

  return (
    <div className="sidePanelScroll">
      {SearchResultJSON.map((SearchResultJSON) => {
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

  return <SidePanelSelection />;
}
