import React from "react";
import "./SearchResult.css";

export default function SearchResult() {
  return (
    <div className="searchResult">
      {/* dynamic data should be passed in as these value */}
      <h1>William Faria Elementary Shool</h1>
      {/* each <p> tag is 1 row of data */}
      <p>10155 Barbara Ln, Cupertino, CA 95014</p>
      <p>
        <span className="inline">0.4 mile</span>
        <span className="inline">20 min</span>
      </p>
    </div>
  );
}
