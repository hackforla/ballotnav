import React from "react";
import "./SearchResult.css";

export default function SearchResult() {
  return (
    <div className="searchResult">
      <h1>601 Pico Blvd Santa Monica 90405</h1>
      <hr></hr>
      <div className="row">
        <div>
          <h2>
            <a href="https://www.santamonica.org">www.santamonica.org</a>
          </h2>
          <h2>
            <a href="https://www.santamonica.org">source</a>
          </h2>
        </div>
        <div>
          <h2>555-5771-243</h2>
          <h2>6:00 AM - 8:00 PM</h2>
        </div>
      </div>
    </div>
  );
}
