import React, { useEffect, useState } from "react";
import "./SidePanelSelection.css";
import SearchResultJSON from "./searchResult.json";

export default function SidePanelSelection({ searchResultId, goToHome }) {
  const [searchResultDetail, setSearchResultDetail] = useState(null);

  useEffect(() => {
    let index = SearchResultJSON.findIndex((x) => x.id == searchResultId);
    setSearchResultDetail(SearchResultJSON[index]);
  }, []);
  return (
    <div className="searchSelection">
      <div onClick={goToHome} className="back">
        <span className="back__icon">BACK</span>
      </div>

      <div>
        {/* dynamic data should be passed in as these value */}
        <h1>{searchResultDetail?.title}</h1>
        {/* each <p> tag is 1 row of data */}
        <p>{searchResultDetail?.location}</p>
        <p>
          <a href={searchResultDetail?.website}>
            {searchResultDetail?.website}
          </a>
        </p>
        <p>
          <span className="inline">{searchResultDetail?.time}</span>
          <span className="inline">{searchResultDetail?.distance} miles</span>
        </p>
      </div>

      <p className="detail">
        Reprehenderit excepteur tempor adipisicing nostrud. Magna quis nulla
        aliqua est sit cupidatat occaecat quis exercitation. Id mollit magna
        officia voluptate. Deserunt ullamco ut culpa occaecat cillum consequat
        amet veniam incididunt commodo consequat. Sit non reprehenderit esse
        veniam qui sint ea irure voluptate deserunt.
      </p>

      <p className="detail">
        Proident id Lorem adipisicing pariatur aute proident dolor esse. Sit
        sunt velit ad consectetur proident duis occaecat eu in aliqua voluptate.
      </p>
      <p>
        In quis irure et nisi quis id laborum consectetur magna Lorem sit
        nostrud. Dolore aliquip eiusmod occaecat minim. Duis sunt consequat
        cupidatat nostrud culpa enim. Minim culpa et culpa consequat dolor duis
        commodo dolor nulla nostrud. Officia culpa aute amet anim. Proident
        velit labore qui id amet est velit nostrud esse tempor dolor sint
        incididunt magna.
      </p>
    </div>
  );
}
