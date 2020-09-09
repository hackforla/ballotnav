import React from "react";
import { useParams } from "react-router-dom";

function Home() {
  const { id } = useParams();
  const hasID = id !== undefined;
  return <div>home {hasID? "id: " + id:"" }</div>;
}

export default Home;
