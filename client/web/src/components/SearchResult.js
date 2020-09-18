import React from "react";
import "./SearchResult.css";

export default function SearchResult(props) {
  return (
    <div onClick={() => props.onClick(props.id)}>
      <div className="searchResult">
        {/* dynamic data should be passed in as these value */}
        <h1>{props.title}</h1>
        {/* each <p> tag is 1 row of data */}
        <p>{props.location}</p>
        <p>
          <a href={props.website}>{props.website}</a>
        </p>
        <p>
          <span className="inline">{props.distance} miles</span>
        </p>
      </div>
    </div>
  );
}
