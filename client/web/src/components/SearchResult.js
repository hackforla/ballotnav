import React from "react";
import "./SearchResult.css";

export default function SearchResult() {
  return (
    <div className="searchResult">
      <h1>William Faria Elementary Shool</h1>
      <div>
        <p>10155 Barbara Ln, Cupertino, CA 95014</p>
      </div>
      <p>
        <span className="inline">0.4 mile</span>{" "}
        <span className="inline">20 min</span>
      </p>
    </div>
  );
}
