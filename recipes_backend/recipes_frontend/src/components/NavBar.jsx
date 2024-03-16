import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <h2>Recipe App</h2>
      <Link to={"/"}>Index</Link>
      <Link to={"/recipes"}>Dashboard</Link>
    </div>
  );
};

export default NavBar;
