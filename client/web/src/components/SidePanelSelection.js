import React from "react";
import "./SidePanelSelection.css";
import SearchResultJSON from "./searchResult.json";

export default function SidePanelSelection(props) {
  function goBack() {
    props.state(true);
  }
  return (
    <div className="searchSelection">
      <p>
        <div onClick={goBack}> ~ back </div>
      </p>
      <h1>{SearchResultJSON[0].title}</h1>
      <p>{SearchResultJSON[0].location}</p>
      <p>
        <a href={SearchResultJSON[0].website}>{SearchResultJSON.website}</a>
      </p>
      <p>{SearchResultJSON[0].time}</p>
      <p>{SearchResultJSON[0].distance} miles</p>
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
