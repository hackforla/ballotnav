/* global document */
import * as React from "react";
import { useState } from "react";
import { render } from "react-dom";
import MapGL from "react-map-gl";

const MAPBOX_TOKEN = ""; // Set your mapbox token here

export default function Mapbox() {
  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      // mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={
        "pk.eyJ1IjoiYmFsbG90bmF2IiwiYSI6ImNrZjAycnpldzBzdzkzMW51eGdwOWxtaWIifQ.KlkcMSLbgrj8qkX2_RSaog"
      }
    />
  );
}
