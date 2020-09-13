import React from "react";
import "./SidePanelList.css";

// components
import SearchResult from "../components/SearchResult";

export default function SidePanelList() {
  return (
    <div className="sidePanelScroll">
      {/* search results should be dynamically inserted here */}
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
  );
}
