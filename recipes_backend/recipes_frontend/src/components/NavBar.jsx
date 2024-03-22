import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const NavBar = () => {
  return (
    <div className="nav-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Recipe App</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link to={"/"} className="link">
            Index
          </Link>
          <Link to={"/recipes"} className="link">
            Dashboard
          </Link>
          <Link to={"/recipes/add"} className="link">
            Add Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
