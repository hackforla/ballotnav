import React from "react";
import "./SearchResult.css";
import SearchResultJSON from "./searchResult.json";

export default function SearchResult() {
  return (
    <div>
      {SearchResultJSON.map((SearchResultJSON, index) => {
        return (
          <div className="searchResult">
            {/* dynamic data should be passed in as these value */}
            <h1>{SearchResultJSON.title}</h1>
            {/* each <p> tag is 1 row of data */}
            <p>{SearchResultJSON.location}</p>
            <p>
              <a href={SearchResultJSON.website}>{SearchResultJSON.website}</a>
            </p>
            <p>
              <span className="inline">{SearchResultJSON.time}</span>
              <span className="inline">{SearchResultJSON.distance} miles</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
